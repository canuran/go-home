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
	result := NewCallerAny2Any(func(inputs ...any) []any {
		time.Sleep(time.Millisecond * 100)
		return []any{"ok", errors.New("no")}
	}).CheckOutputsError().Call(1, "a")

	fmt.Println("String:", result.String())
	fmt.Println("Call error:", result.Error())
	fmt.Println("Call inputs:", result.Inputs())
	fmt.Println("Call outputs:", result.Outputs())
	output, _ := result.OutputAt(0)
	fmt.Println("Call output at 0:", output)
	fmt.Println("Call duration:", result.Duration())
	fmt.Println("Call wait:", time.Since(now))

	assert.Equal(t, 1, result.Inputs()[0])
	assert.Equal(t, "ok", result.Outputs()[0])
	assert.Equal(t, "no", result.Error().Error())
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
	result := NewCaller2Err(func() error {
		time.Sleep(time.Millisecond * 150)
		return nil
	}).SetTimeout(time.Millisecond * 100).Call()
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

func TestAdvance(t *testing.T) {
	result := NewCallerCtx(func(ctx context.Context) {
		fmt.Println(ctx)
	}).Call(context.Background())
	assert.Nil(t, result.Error())

	result = NewCallerAny2Err(func(inputs ...any) error {
		fmt.Println(inputs...)
		return nil
	}).Call("NewCallerAny2Err", 1, 2, 3)
	fmt.Println("NewCallerAny2Err outputs:", result.Outputs())
	assert.Nil(t, result.Error())

	result = NewCallerCtx2Err(func(ctx context.Context) error {
		return nil
	}).Call(context.Background())
	assert.Nil(t, result.Error())

	result = NewCallerCtxAny2Any(func(ctx context.Context, inputs ...any) []any {
		inputs[0].(func(name string))(inputs[1].(string))
		fmt.Println(inputs[2:])
		return []any{"NewCallerCtxAny2Any", 1}
	}).Call(context.Background(), func(name string) {
		fmt.Println("name:", name)
	}, "NewCallerCtxAny2Any", 1, 2, 3)

	fmt.Println("Call error:", result.Error())
	fmt.Println("Call outputs:", result.Outputs())
	assert.Nil(t, result.Error())

}

// BenchmarkCaller-12        932640              1199 ns/op
func BenchmarkCaller(b *testing.B) {
	for i := 0; i < b.N; i++ {
		_ = NewCallerAny(func(inputs ...any) {
		}).Call("元宝", 1, 2, 3).
			Error()
	}
}

// BenchmarkDirect-12       1000000              1024 ns/op
func BenchmarkDirect(b *testing.B) {
	for i := 0; i < b.N; i++ {
		var wg sync.WaitGroup
		wg.Add(1)
		go func(inputs ...any) {
			wg.Done()
		}("元宝", 1, 2, 3)
		wg.Wait()
	}
}
