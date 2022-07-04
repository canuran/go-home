package async

import (
	"context"
	"errors"
	"fmt"
	"github.com/stretchr/testify/assert"
	"sync"
	"testing"
	"time"
)

func TestAsync(t *testing.T) {
	now := time.Now()
	result := NewCallerCtxAny2AnyErr(
		func(ctx context.Context, input any) (any, error) {
			time.Sleep(time.Millisecond * 100)
			return input, errors.New("CtxAny2AnyErr")
		}).
		CheckOutputsError().
		Call(context.Background(), "CtxAny2AnyErr")

	output, err := result.OutputAt(0)
	fmt.Println("String:", result.String())
	fmt.Println("Call error:", result.Error())
	fmt.Println("Call inputs:", result.Inputs())
	fmt.Println("Call outputs:", result.Outputs())
	fmt.Println("Call output at 0:", output)
	fmt.Println("Call duration:", result.Duration())
	fmt.Println("Call wait:", time.Since(now))

	assert.Equal(t, "CtxAny2AnyErr", err.Error())
	assert.Equal(t, "CtxAny2AnyErr", result.Inputs()[1])
	assert.Equal(t, "CtxAny2AnyErr", result.Outputs()[0])
}

func TestRecover(t *testing.T) {
	now := time.Now()
	result := NewCaller(func() {
		panic("boom")
	}).Call()

	fmt.Println("Call recovered error:", result.Error())
	fmt.Println("Call recovered outputs:", result.Outputs())
	fmt.Println("Call recovered recover:", result.Recovered())
	fmt.Println("Call recovered duration:", result.Duration())
	fmt.Println("Call recovered wait:", time.Since(now))

	assert.Equal(t, "boom", result.Recovered())
}

func TestTimeout(t *testing.T) {
	now := time.Now()
	result := NewCaller2Any(
		func() any {
			time.Sleep(time.Millisecond * 150)
			return "NewCaller2Err"
		}).
		SetTimeout(time.Millisecond * 100).
		Call()
	err := result.Error()
	wait := time.Since(now)

	time.Sleep(time.Millisecond * 200)
	fmt.Println("Call error:", err)
	fmt.Println("Call outputs:", result.Outputs())
	fmt.Println("Call duration:", result.Duration())
	fmt.Println("Call wait:", wait)

	assert.Error(t, err)
	assert.True(t, result.Timeouted())
}

// BenchmarkCaller-12        934629              1174 ns/op
func BenchmarkCaller(b *testing.B) {
	for i := 0; i < b.N; i++ {
		_ = NewCallerAny(func(input any) {
		}).Call("元宝").
			Error()
	}
}

// BenchmarkDirect-12       1208538               988.5 ns/op
func BenchmarkDirect(b *testing.B) {
	for i := 0; i < b.N; i++ {
		var wg sync.WaitGroup
		wg.Add(1)
		go func(input any) {
			wg.Done()
		}("元宝")
		wg.Wait()
	}
}
