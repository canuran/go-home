package valuer

import (
	"fmt"
	"math"
	"math/rand"
	"sync"
	"testing"
	"time"
)

func TestNewRandId(t *testing.T) {
	fmt.Println(NewRandId())
	fmt.Println(NewRandId())
	fmt.Println(GetTimeByRandId(NewRandId()))
	fmt.Println(GetTimeByRandId(math.MaxInt64))
}

// 模拟1万QPS左右10次未出现重复
// 提升到2万QPS左右出现个别重复
func TestRandIdRepeats(t *testing.T) {
	for i := 0; i < 10; i++ {
		TestRandIdRepeat(t)
		fmt.Println()
	}
}

func TestRandIdRepeat(t *testing.T) {
	total := 11000
	var m sync.Map
	var wg sync.WaitGroup
	wg.Add(total)

	// 并发生成并计时
	now := time.Now()
	for i := 0; i < total; i++ {
		go func() {
			time.Sleep(time.Millisecond * time.Duration(rand.Int31n(1000)))
			m.Store(NewRandId(), 1)
			wg.Done()
		}()
	}
	wg.Wait()
	duration := time.Since(now)

	// 统计生成结果
	var count int
	m.Range(func(key, value any) bool {
		count++
		return true
	})
	fmt.Println("总数:", total)
	fmt.Println("QPS:", int64(total)*int64(time.Second)/int64(duration))
	fmt.Println("唯一:", count)
	fmt.Println("重复:", total-count)
}

// 约 30.83 ns/op
func BenchmarkNewRandId(b *testing.B) {
	for i := 0; i < b.N; i++ {
		_ = NewRandId()
	}
}
