package async

import (
	"fmt"
	"sync"
	"testing"
	"time"
)

func TestAsync(t *testing.T) {
	now := time.Now()
	result := NewBuilder(func() (any, error) {
		time.Sleep(time.Millisecond * 100)
		return "ok", nil
	}).Call()

	fmt.Println("AsyncCall error:", result.Error())
	fmt.Println("AsyncCall results:", result.Results())
	fmt.Println("AsyncCall duration:", result.Duration())
	fmt.Println("AsyncCall wait:", time.Since(now))
}

func TestRecover(t *testing.T) {
	now := time.Now()
	result := NewBuilder(func() (any, error) {
		panic("boom")
	}).Call()

	fmt.Println("AsyncCall recovered error:", result.Error())
	fmt.Println("AsyncCall recovered results:", result.Results())
	fmt.Println("AsyncCall recovered recover:", result.Recovered())
	fmt.Println("AsyncCall recovered duration:", result.Duration())
	fmt.Println("AsyncCall recovered wait:", time.Since(now))
}

func TestTimeout(t *testing.T) {
	now := time.Now()
	result := NewBuilder(func() (any, error) {
		time.Sleep(time.Millisecond * 150)
		return "ok", nil
	}).SetTimeout(time.Millisecond * 100).Call()

	time.Sleep(time.Millisecond * 200)
	fmt.Println("AsyncTimeoutCall error:", result.Error())
	fmt.Println("AsyncTimeoutCall results:", result.Results())
	fmt.Println("AsyncTimeoutCall duration:", result.Duration())
	fmt.Println("AsyncTimeoutCall wait:", time.Since(now))
}

func TestAdvance(t *testing.T) {
	result := NewBuilder(func(do func(name string), name string, ids ...int) {
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
		NewBuilder(func(name string, ids ...int) {
		}).Call("元宝", 1, 2, 3)
	}
}

// BenchmarkDirectGo-12  1000000  1106 ns/op
func BenchmarkDirectGo(b *testing.B) {
	for i := 0; i < b.N; i++ {
		var wg sync.WaitGroup
		wg.Add(1)
		go func(name string, ids ...int) {
			wg.Done()
		}("元宝", 1, 2, 3)
		wg.Wait()
	}
}
