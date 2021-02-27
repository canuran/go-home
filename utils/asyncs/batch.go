package asyncs

import (
	"log"
	"reflect"
	"sync"
)

// 异步分批调用，参数必须是slice
func AsyncBatchCall(slice interface{}, subSize int, subCall func(
	subSlice interface{}) interface{}) []interface{} {
	// 校验参数
	if slice == nil {
		return nil
	}

	sliceType := reflect.TypeOf(slice)
	if sliceType.Kind() != reflect.Slice {
		return nil
	}

	values := reflect.ValueOf(slice)
	length := values.Len()
	if length < 1 {
		return nil
	}

	// 初始化变量
	var wg sync.WaitGroup
	var lock sync.Mutex
	subArgs := reflect.New(sliceType).Elem()
	var results []interface{}
	if subSize < 1 {
		subSize = 1
	}

	// 分批循环执行
	for i := 0; i < length; i++ {
		subArgs = reflect.Append(subArgs, values.Index(i))
		if i == length-1 || (i+1)%subSize == 0 {
			wg.Add(1)

			// 异步调用
			go func(each interface{}) {
				defer func() {
					wg.Done()
					if r := recover(); r != nil {
						log.Println(r)
					}
				}()

				result := subCall(each)

				// 汇总结果
				lock.Lock()
				results = append(results, result)
				lock.Unlock()
			}(subArgs.Interface())

			if i < length-1 {
				subArgs = reflect.New(sliceType).Elem()
			}
		}
	}

	wg.Wait()
	return results
}
