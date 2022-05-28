package service

import (
	"context"
	"encoding/json"
	"errors"
	"github.com/ewingtsai/go-home/generate/model"
	"github.com/ewingtsai/go-home/repo"
	"github.com/ewingtsai/go-home/utils/jsoner"
	"github.com/ewingtsai/go-home/utils/valuer"
	log "github.com/sirupsen/logrus"
	"reflect"
	"runtime"
	"sync"
	"sync/atomic"
	"time"
)

var EmptyCheckErr = errors.New("empty check error")

type Worker struct {
	Total   int64
	Success int64
	Fail    int64
	Skip    int64
	PreId   int64
	CostMs  int64
	Qps     int64
}

type Params struct {
	Runners   int64  // 并发数，默认10
	Reset     bool   // 是否重置进度，默认不重置
	IdDesc    bool   // 是否降序滚动，默认为升序
	ConfigKey string // 进度存储配置Key，默认不存储进度

	// QueryFunc 单协程循环调用，返回的数据类型必须是数组或切片
	QueryFunc func(ctx context.Context, preId int64) (any, error)

	// GetIdFunc 单协程循环调用，返回当前数据的ID
	GetIdFunc func(ctx context.Context, each any) int64

	// FilterFunc 异步并发调用，返回是否让 RunFunc 处理该数据并统计跳过数
	FilterFunc func(ctx context.Context, each any) bool

	// RunFunc 异步并发调用，返回是否出错并统计成功和失败数
	RunFunc func(ctx context.Context, each any) error
}

// Scrolling 滚动执行
func Scrolling(ctx context.Context, params *Params) error {
	if params == nil || params.QueryFunc == nil ||
		params.GetIdFunc == nil || params.RunFunc == nil {
		return EmptyCheckErr
	}

	worker := &Worker{}
	defer func() {
		if r := recover(); r != nil {
			stack := make([]byte, 4096)
			size := runtime.Stack(stack, false)
			log.Errorf("Scrolling panic:worker=%s, r=%v, stack=%v",
				jsoner.MarshalString(worker), r, string(stack[:size]))
		}
	}()

	// 控制并发
	runners := params.Runners
	if runners < 1 {
		runners = 10
	}

	// 重置进度
	if params.Reset {
		if len(params.ConfigKey) > 0 {
			_ = repo.SaveConfig(ctx, &model.Config{
				Config: params.ConfigKey, Num: 0, Value: "{}",
			})
		}
	}

	// 获取进度
	if len(params.ConfigKey) > 0 {
		Config, _ := repo.GetConfig(context.Background(), params.ConfigKey)
		if Config != nil {
			_ = json.Unmarshal([]byte(Config.Value), worker)
			worker.PreId = Config.Num
		} else {
			_ = repo.SaveConfig(ctx, &model.Config{
				Config: params.ConfigKey, Num: 0, Value: "{}",
			})
		}
	}

	log.Infof("Scrolling begin:worker=%s", jsoner.MarshalString(worker))

	var runningIdMap sync.Map
	runningQueue := make(chan int, runners)
	var wg sync.WaitGroup
	for {
		start := time.Now()
		// 循环滚动遍历数据
		log.Infof("Scrolling batch begin:worker=%s", jsoner.MarshalString(worker))
		results, err := params.QueryFunc(ctx, worker.PreId)
		if err != nil {
			log.Errorf("Scrolling query error:worker=%s", jsoner.MarshalString(worker))
			time.Sleep(time.Second)
			continue
		}
		if results == nil {
			log.Infof("Scrolling query nil:worker=%s", jsoner.MarshalString(worker))
			break
		}
		kind := reflect.TypeOf(results).Kind()
		if kind != reflect.Slice && kind != reflect.Array {
			log.Errorf("Scrolling query unsupported result type:worker=%s", jsoner.MarshalString(worker))
			break
		}
		slice := reflect.ValueOf(results)
		if slice.Len() < 1 {
			log.Infof("Scrolling query empty:worker=%s", jsoner.MarshalString(worker))
			break
		}

		// 循环跑任务
		for i := 0; i < slice.Len(); i++ {
			worker.Total++
			runRow := slice.Index(i).Interface()
			runCtx := context.Background()
			// ID滚动
			runId := params.GetIdFunc(runCtx, runRow)
			if params.IdDesc {
				if worker.PreId > runId {
					worker.PreId = runId
				}
			} else {
				if worker.PreId < runId {
					worker.PreId = runId
				}
			}

			// 并行处理
			runningQueue <- 1
			wg.Add(1)
			go func(goCtx context.Context, goRow any, goId int64) {
				defer func() {
					if r := recover(); r != nil {
						atomic.AddInt64(&worker.Fail, 1)
						stack := make([]byte, 4096)
						size := runtime.Stack(stack, false)
						log.Errorf("Scrolling each panic:id=%d, r=%v, stack=%v",
							jsoner.MarshalString(worker), r, string(stack[:size]))
					}
					<-runningQueue
					wg.Done()
					runningIdMap.Delete(goId)
				}()
				runningIdMap.Store(goId, true)

				// 过滤数据
				if params.FilterFunc != nil {
					if !params.FilterFunc(goCtx, goRow) {
						atomic.AddInt64(&worker.Skip, 1)
						return
					}
				}

				// 开始跑任务
				begin := time.Now()
				goErr := params.RunFunc(goCtx, goRow)
				if goErr != nil {
					atomic.AddInt64(&worker.Fail, 1)
					log.Errorf("Scrolling RunFunc error:id=%d,err=%v", goId, goErr)
				} else {
					atomic.AddInt64(&worker.Success, 1)
					log.Errorf("Scrolling RunFunc done:id=%d,cost=%v", goId, time.Since(begin))
				}
			}(runCtx, runRow, runId)
		}

		time.Sleep(time.Millisecond * 10)
		saveProgress(params, &runningIdMap, worker) // 保存进度
		log.Infof("Scrolling batch done:worker=%s", jsoner.MarshalString(worker))
		atomic.AddInt64(&worker.CostMs, int64(time.Since(start)/time.Millisecond))
	}
	wg.Wait()
	saveProgress(params, &runningIdMap, worker) // 保存进度
	log.Infof("Scrolling done:worker=%s", jsoner.MarshalString(worker))
	return nil
}

func saveProgress(params *Params, runningIdMap *sync.Map, worker *Worker) {
	// 找到最大的正在跑的
	saveId := worker.PreId
	runningIdMap.Range(func(key, value any) bool {
		keyInt := valuer.Int64ify(key)
		if params.IdDesc { // 降序找比最大的更大
			if keyInt >= saveId {
				saveId = keyInt + 1
			}
		} else {
			if keyInt <= saveId { // 升序找最小的更小
				saveId = keyInt - 1
			}
		}
		return true
	})

	if worker.CostMs > 0 {
		worker.Qps = worker.Total * 1000 / worker.CostMs
	}
	log.Infof("Scrolling saveProgress:saveId=%d,worker=%s",
		saveId, jsoner.MarshalString(worker))

	if len(params.ConfigKey) > 0 {
		_ = repo.UpdateConfig(context.Background(), &model.Config{
			Config: params.ConfigKey,
			Num:    saveId,
			Value:  jsoner.MarshalString(worker),
		})
	}
}
