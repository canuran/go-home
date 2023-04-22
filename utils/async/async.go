// Package async 高性能异步方法调用
// 支持超时控制、错误检查、自动recover
// 不使用channel，方便多次获取返回值
package async

import (
	"context"
	"sync"
	"time"
)

func NewCaller[In, Out any](fn func(In) Out) Caller[In, Out] {
	return &caller[In, Out]{
		ctx: context.Background(),
		fn: func(ctx context.Context, in In) (Out, error) {
			return fn(in), nil
		},
	}
}

func NewCtxCaller[In, Out any](fn func(context.Context, In) (Out, error)) Caller[In, Out] {
	return &caller[In, Out]{
		ctx: context.Background(),
		fn:  fn,
	}
}

type Caller[In, Out any] interface {
	String() string
	SetInput(In) Caller[In, Out]
	SetContext(context.Context) Caller[In, Out]
	SetTimeout(time.Duration) Caller[In, Out]
	Call() Result[In, Out]
}

type Result[In, Out any] interface {
	String() string
	Context() context.Context
	Input() In
	Output() Out
	Error() error
	Timeout() time.Duration
	Duration() time.Duration
	Timeouted() bool
	Recovered() any
	Success() bool
}

// 实现了 Caller 和 Result
type caller[In, Out any] struct {
	fn        func(context.Context, In) (Out, error)
	timeout   time.Duration
	duration  time.Duration
	wait      sync.WaitGroup
	ctx       context.Context
	input     In
	output    Out
	error     error
	recovered any
	timeouted bool
}

func (c *caller[In, Out]) String() string {
	return "async caller"
}

func (c *caller[In, Out]) SetInput(in In) Caller[In, Out] {
	c.input = in
	return c
}

func (c *caller[In, Out]) SetContext(ctx context.Context) Caller[In, Out] {
	c.ctx = ctx
	return c
}

func (c *caller[In, Out]) SetTimeout(timeout time.Duration) Caller[In, Out] {
	c.timeout = timeout
	return c
}

func (c *caller[In, Out]) Timeout() time.Duration {
	return c.timeout
}

func (c *caller[In, Out]) Context() context.Context {
	return c.ctx
}

func (c *caller[In, Out]) Input() In {
	return c.input
}

func (c *caller[In, Out]) Output() Out {
	c.wait.Wait()
	return c.output
}

func (c *caller[In, Out]) Error() error {
	c.wait.Wait()
	return c.error
}

func (c *caller[In, Out]) Duration() time.Duration {
	c.wait.Wait()
	return c.duration
}

func (c *caller[In, Out]) Timeouted() bool {
	c.wait.Wait()
	return c.timeouted
}

func (c *caller[In, Out]) Recovered() any {
	c.wait.Wait()
	return c.recovered
}

func (c *caller[In, Out]) Success() bool {
	c.wait.Wait()
	return !c.timeouted && c.recovered == nil && c.error == nil
}

func (c *caller[In, Out]) Call() Result[In, Out] {
	c.wait.Add(1)
	if c.timeout > 0 {
		// 只执行一次结束逻辑
		var once sync.Once
		go func() {
			c.callFunc()
			// 正常结束
			once.Do(c.wait.Done)
		}()

		time.AfterFunc(c.timeout, func() {
			// 超时结束
			once.Do(func() {
				c.timeouted = true
				c.duration = c.timeout
				c.wait.Done()
			})
		})

	} else {
		go func() {
			c.callFunc()
			c.wait.Done()
		}()
	}
	return c
}

func (c *caller[In, Out]) callFunc() {
	start := time.Now()
	defer func() {
		if r := recover(); r != nil {
			c.recovered = r
		}
		c.duration = time.Since(start)
	}()
	c.output, c.error = c.fn(c.ctx, c.input)
}
