package async

import (
	"fmt"
	"sync"
	"testing"
	"time"
)

func TestAsync(t *testing.T) {
	now := time.Now()
	result := NewCaller(func() (any, error) {
		time.Sleep(time.Millisecond * 100)
		return "ok", nil
	}).Call()

	fmt.Println("String:", result.String())
	fmt.Println("Call error:", result.Error())
	fmt.Println("Call results:", result.Results())
	fmt.Println("Call duration:", result.Duration())
	fmt.Println("Call wait:", time.Since(now))
}

func TestRecover(t *testing.T) {
	now := time.Now()
	result := NewCaller(func() (any, error) {
		panic("boom")
	}).Call()

	fmt.Println("Call recovered error:", result.Error())
	fmt.Println("Call recovered results:", result.Results())
	fmt.Println("Call recovered recover:", result.Recovered())
	fmt.Println("Call recovered duration:", result.Duration())
	fmt.Println("Call recovered wait:", time.Since(now))
}

func TestTimeout(t *testing.T) {
	now := time.Now()
	result := NewCaller(func() (any, error) {
		time.Sleep(time.Millisecond * 150)
		return "ok", nil
	}).SetTimeout(time.Millisecond * 100).Call()
	err := result.Error()
	wait := time.Since(now)

	time.Sleep(time.Millisecond * 200)
	fmt.Println("Call error:", err)
	fmt.Println("Call results:", result.Results())
	fmt.Println("Call duration:", result.Duration())
	fmt.Println("Call wait:", wait)
}

func TestAdvance(t *testing.T) {
	result := NewCaller(func(do func(name string), name string, ids ...int) {
		do(name)
		fmt.Println(ids)
	}).Call(func(name string) {
		fmt.Println("name:", name)
	}, "元宝", []int{1, 2, 3}, []int{}, nil)

	fmt.Println("error:", result.Error())
}

// 结果和直接go调用基本没有差别
// BenchmarkCaller-12  922090  1137 ns/op
func BenchmarkCaller(b *testing.B) {
	for i := 0; i < b.N; i++ {
		NewCaller(func(name string, ids ...int) {
		}).Call("元宝", 1, 2, 3)
	}
}

// BenchmarkWaitGroup-12  1000000  1106 ns/op
func BenchmarkWaitGroup(b *testing.B) {
	for i := 0; i < b.N; i++ {
		var wg sync.WaitGroup
		wg.Add(1)
		go func(name string, ids ...int) {
			wg.Done()
		}("元宝", 1, 2, 3)
		wg.Wait()
	}
}

// BenchmarkRWMutex-12  1000000  1065 ns/op
func BenchmarkRWMutex(b *testing.B) {
	for i := 0; i < b.N; i++ {
		var lock sync.RWMutex
		lock.Lock()
		go func(name string, ids ...int) {
			lock.Unlock()
		}("元宝", 1, 2, 3)
		lock.RLock()
	}
}
