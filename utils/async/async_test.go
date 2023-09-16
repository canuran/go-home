package async

import (
	"fmt"
	"github.com/stretchr/testify/assert"
	"sync"
	"testing"
	"time"
)

func TestSimpleCaller(t *testing.T) {
	now := time.Now()
	result := NewCaller(func() (any, error) {
		time.Sleep(time.Millisecond * 100)
		return "simple caller done", nil
	}).Call()

	output := result.Output()
	assert.Equal(t, output, "simple caller done")
	fmt.Println("String:", result.String())
	fmt.Println("Call error:", result.Error())
	fmt.Println("Call output:", result.Output())
	fmt.Println("Call duration:", result.Duration())
	fmt.Println("Call timeouted:", result.Timeouted())
	fmt.Println("Call success:", result.Success())
	fmt.Println("Call wait:", time.Since(now))
}

func TestPanicCaller(t *testing.T) {
	now := time.Now()
	result := NewCaller[string](
		func() (string, error) {
			time.Sleep(time.Millisecond * 100)
			panic("panic caller")
			return "", nil
		}).Call()

	recovered := result.Recovered()
	assert.Equal(t, recovered, "panic caller")
	fmt.Println("String:", result.String())
	fmt.Println("Call error:", result.Error())
	fmt.Println("Call output:", result.Output())
	fmt.Println("Call duration:", result.Duration())
	fmt.Println("Call timeouted:", result.Timeouted())
	fmt.Println("Call success:", result.Success())
	fmt.Println("Call wait:", time.Since(now))
}

// BenchmarkCaller-12        910650              1201 ns/op
func BenchmarkCaller(b *testing.B) {
	for i := 0; i < b.N; i++ {
		_ = NewCaller(func() (any, error) {
			return nil, nil
		}).Call().Error()
	}
}

// BenchmarkDirect-12       1000000              1034 ns/op
func BenchmarkDirect(b *testing.B) {
	for i := 0; i < b.N; i++ {
		var wg sync.WaitGroup
		wg.Add(1)
		go func() {
			wg.Done()
		}()
		wg.Wait()
	}
}

// BenchmarkChanel-12       1204821               989.5 ns/op
func BenchmarkChanel(b *testing.B) {
	for i := 0; i < b.N; i++ {
		ch := make(chan bool)
		go func() {
			ch <- true
		}()
		<-ch
	}
}
