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

func NewCaller2Any(fn func() any) Caller {
	return &caller{
		fn: fn,
	}
}

func NewCaller2Err(fn func() error) Caller {
	return &caller{
		fn: fn,
	}
}

func NewCaller2AnyErr(fn func() (any, error)) Caller {
	return &caller{
		fn: fn,
	}
}

func NewCallerAny(fn func(input any)) Caller {
	return &caller{
		fn: fn,
	}
}

func NewCallerAny2Any(fn func(input any) any) Caller {
	return &caller{
		fn: fn,
	}
}

func NewCallerAny2Err(fn func(input any) error) Caller {
	return &caller{
		fn: fn,
	}
}

func NewCallerAny2AnyErr(fn func(input any) (any, error)) Caller {
	return &caller{
		fn: fn,
	}
}

func NewCallerCtx(fn func(ctx context.Context)) Caller {
	return &caller{
		fn: fn,
	}
}

func NewCallerCtx2Any(fn func(ctx context.Context) any) Caller {
	return &caller{
		fn: fn,
	}
}

func NewCallerCtx2Err(fn func(ctx context.Context) error) Caller {
	return &caller{
		fn: fn,
	}
}

func NewCallerCtx2AnyErr(fn func(ctx context.Context) (any, error)) Caller {
	return &caller{
		fn: fn,
	}
}

func NewCallerCtxAny(fn func(ctx context.Context, input any)) Caller {
	return &caller{
		fn: fn,
	}
}

func NewCallerCtxAny2Any(fn func(ctx context.Context, input any) any) Caller {
	return &caller{
		fn: fn,
	}
}

func NewCallerCtxAny2Err(fn func(ctx context.Context, input any) error) Caller {
	return &caller{
		fn: fn,
	}
}

func NewCallerCtxAny2AnyErr(fn func(ctx context.Context, input any) (any, error)) Caller {
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

	// 此处为正则生成的代码，经过测试 if 比 switch 效率要高
	if fn, ok := c.fn.(func()); ok {
		fn()
	} else if fn2Any, ok2Any := c.fn.(func() any); ok2Any {
		c.outputs = []any{fn2Any()}
	} else if fn2Err, ok2Err := c.fn.(func() error); ok2Err {
		c.outputs = []any{fn2Err()}
	} else if fn2AnyErr, ok2AnyErr := c.fn.(func() (any, error)); ok2AnyErr {
		result, callErr := fn2AnyErr()
		c.outputs = []any{result, callErr}
	} else if fnAny, okAny := c.fn.(func(input any)); okAny {
		fnAny(c.inputs[0])
	} else if fnAny2Any, okAny2Any := c.fn.(func(input any) any); okAny2Any {
		c.outputs = []any{fnAny2Any(c.inputs[0])}
	} else if fnAny2Err, okAny2Err := c.fn.(func(input any) error); okAny2Err {
		c.outputs = []any{fnAny2Err(c.inputs[0])}
	} else if fnAny2AnyErr, okAny2AnyErr := c.fn.(func(input any) (any, error)); okAny2AnyErr {
		result, callErr := fnAny2AnyErr(c.inputs[0])
		c.outputs = []any{result, callErr}
	} else if fnCtx, okCtx := c.fn.(func(ctx context.Context)); okCtx {
		fnCtx(c.inputs[0].(context.Context))
	} else if fnCtx2Any, okCtx2Any := c.fn.(func(ctx context.Context) any); okCtx2Any {
		c.outputs = []any{fnCtx2Any(c.inputs[0].(context.Context))}
	} else if fnCtx2Err, okCtx2Err := c.fn.(func(ctx context.Context) error); okCtx2Err {
		c.outputs = []any{fnCtx2Err(c.inputs[0].(context.Context))}
	} else if fnCtx2AnyErr, okCtx2AnyErr := c.fn.(func(ctx context.Context) (any, error)); okCtx2AnyErr {
		result, callErr := fnCtx2AnyErr(c.inputs[0].(context.Context))
		c.outputs = []any{result, callErr}
	} else if fnCtxAny, okCtxAny := c.fn.(func(ctx context.Context, input any)); okCtxAny {
		fnCtxAny(c.inputs[0].(context.Context), c.inputs[1])
	} else if fnCtxAny2Any, okCtxAny2Any := c.fn.(func(ctx context.Context, input any) any); okCtxAny2Any {
		c.outputs = []any{fnCtxAny2Any(c.inputs[0].(context.Context), c.inputs[1])}
	} else if fnCtxAny2Err, okCtxAny2Err := c.fn.(func(ctx context.Context, input any) error); okCtxAny2Err {
		c.outputs = []any{fnCtxAny2Err(c.inputs[0].(context.Context), c.inputs[1])}
	} else if fnCtxAny2AnyErr, okCtxAny2AnyErr := c.fn.(func(ctx context.Context, input any) (any, error)); okCtxAny2AnyErr {
		result, callErr := fnCtxAny2AnyErr(c.inputs[0].(context.Context), c.inputs[1])
		c.outputs = []any{result, callErr}
	} else {
		c.error = errors.New("unsupported func type")
	}

	if c.checker != nil {
		c.error = c.checker(c.outputs)
	}
}
