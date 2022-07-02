// Package async 高性能异步方法调用
// 支持超时控制、错误检查、自动recover
// 不使用反射，但支持常用的函数签名形式
// 不使用channel，方便多次获取返回值
package async

import (
	"context"
	"errors"
	"fmt"
	"sync"
	"time"
)

func NewCaller(fn func()) Caller {
	return &caller{
		fn: fn,
	}
}

func NewCaller2Err(fn func() error) Caller {
	return &caller{
		fn: fn,
	}
}

func NewCallerAny(fn func(inputs ...any)) Caller {
	return &caller{
		fn: fn,
	}
}

func NewCallerAny2Err(fn func(inputs ...any) error) Caller {
	return &caller{
		fn: fn,
	}
}

func NewCallerAny2Any(fn func(inputs ...any) []any) Caller {
	return &caller{
		fn: fn,
	}
}

func NewCallerCtx(fn func(ctx context.Context)) Caller {
	return &caller{
		fn: fn,
	}
}

func NewCallerCtx2Err(fn func(ctx context.Context) error) Caller {
	return &caller{
		fn: fn,
	}
}

func NewCallerCtxAny2Any(fn func(ctx context.Context, inputs ...any) []any) Caller {
	return &caller{
		fn: fn,
	}
}

type Caller interface {
	String() string
	SetTimeout(timeout time.Duration) Caller
	OutputsChecker(checker func(values []any) error) Caller
	CheckOutputsError() Caller
	Call(inputs ...any) Result
}

type Result interface {
	String() string
	Timeout() time.Duration
	Inputs() []any
	Outputs() []any
	OutputAt(index int) (any, error)
	Duration() time.Duration
	Timeouted() bool
	Recovered() any
	Error() error
}

func ErrorChecker(values []any) error {
	for _, value := range values {
		err, ok := value.(error)
		if ok && err != nil {
			return err
		}
	}
	return nil
}

// 实现了 Caller 和 Result
type caller struct {
	fn        any
	timeout   time.Duration
	duration  time.Duration
	wait      sync.WaitGroup
	checker   func(values []any) error
	inputs    []any
	outputs   []any
	recovered any
	timeouted bool
	error     error
}

func (c *caller) String() string {
	return "async caller"
}

func (c *caller) SetTimeout(timeout time.Duration) Caller {
	c.timeout = timeout
	return c
}

func (c *caller) OutputsChecker(checker func(values []any) error) Caller {
	c.checker = checker
	return c
}

func (c *caller) CheckOutputsError() Caller {
	c.checker = ErrorChecker
	return c
}

func (c *caller) Timeout() time.Duration {
	return c.timeout
}

func (c *caller) Inputs() []any {
	return c.inputs
}

func (c *caller) OutputAt(index int) (any, error) {
	err := c.Error() // Error方法会等待执行完成
	if index < len(c.outputs) && index > -1 {
		return c.outputs[index], err
	} else {
		return nil, errors.New("index out of range")
	}
}

func (c *caller) Outputs() []any {
	c.wait.Wait()
	return c.outputs
}

func (c *caller) Duration() time.Duration {
	c.wait.Wait()
	return c.duration
}

func (c *caller) Timeouted() bool {
	c.wait.Wait()
	return c.timeouted
}

func (c *caller) Recovered() any {
	c.wait.Wait()
	return c.recovered
}

func (c *caller) Error() error {
	c.wait.Wait()
	if c.error != nil {
		return c.error
	}
	if c.recovered != nil {
		return fmt.Errorf("panic recovered: %v", c.recovered)
	}
	if c.timeouted {
		return fmt.Errorf("timeouted of: %v", c.timeout)
	}
	return nil
}

func (c *caller) Call(inputs ...any) Result {
	start := time.Now()
	c.wait.Add(1)
	c.inputs = inputs

	if c.timeout > 0 {
		// 只执行一次结束逻辑
		var once sync.Once
		go func() {
			c.callFunction()
			// 正常结束
			once.Do(func() {
				c.duration = time.Since(start)
				c.wait.Done()
			})
		}()

		time.AfterFunc(c.timeout, func() {
			// 超时结束
			once.Do(func() {
				c.timeouted = true
				c.duration = time.Since(start)
				c.wait.Done()
			})
		})

	} else {
		go func() {
			c.callFunction()
			c.duration = time.Since(start)
			c.wait.Done()
		}()
	}
	return c
}

func (c *caller) callFunction() {
	defer func() {
		if r := recover(); r != nil {
			c.recovered = r
		}
	}()

	// 此处经过测试 if 比 switch 效率要高
	if fnCtx2Err, okCtx2Err := c.fn.(func(ctx context.Context) error); okCtx2Err {
		c.outputs = []any{fnCtx2Err(c.inputs[0].(context.Context))}

	} else if fnCtxAny2Any, okCtxAny2Any := c.fn.(func(ctx context.Context, inputs ...any) []any); okCtxAny2Any {
		c.outputs = fnCtxAny2Any(c.inputs[0].(context.Context), c.inputs[1:]...)

	} else if fnAny2Any, okAny2Any := c.fn.(func(inputs ...any) []any); okAny2Any {
		c.outputs = fnAny2Any(c.inputs...)

	} else if fnAny2Err, okAny2Err := c.fn.(func(inputs ...any) error); okAny2Err {
		c.outputs = []any{fnAny2Err(c.inputs...)}

	} else if fnErr, okErr := c.fn.(func() error); okErr {
		c.outputs = []any{fnErr()}

	} else if fn, okFn := c.fn.(func()); okFn {
		fn()

	} else if fnAny, okAny := c.fn.(func(inputs ...any)); okAny {
		fnAny()

	} else if fnCtx, okCtx := c.fn.(func(ctx context.Context)); okCtx {
		fnCtx(c.inputs[0].(context.Context))
	} else {
		c.error = errors.New("unsupported func type")
	}

	if c.checker != nil {
		c.error = c.checker(c.outputs)
	}
}
