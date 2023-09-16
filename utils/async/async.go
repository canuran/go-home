// Package async 高性能异步方法调用，支持超时控制、错误检查、自动recover
// 返回值可多次获取，经测试性能与直接使用WaitGroup、Channel接近
package async

import (
	"errors"
	"sync"
	"time"
)

func NewCaller[Out any](fn func() (Out, error)) Caller[Out] {
	return &caller[Out]{
		fn: fn,
	}
}

type Caller[Out any] interface {
	String() string
	SetTimeout(time.Duration) Caller[Out]
	Call() Result[Out]
}

type Result[Out any] interface {
	String() string
	Output() Out
	Error() error
	Timeout() time.Duration
	Duration() time.Duration
	Timeouted() bool
	Recovered() any
	Success() error
}

// 实现了 Caller 和 Result
type caller[Out any] struct {
	fn        func() (Out, error)
	timeout   time.Duration
	duration  time.Duration
	wait      sync.WaitGroup
	output    Out
	error     error
	recovered any
	timeouted bool
}

func (c *caller[Out]) String() string {
	return "async caller"
}

func (c *caller[Out]) SetTimeout(timeout time.Duration) Caller[Out] {
	c.timeout = timeout
	return c
}

func (c *caller[Out]) Timeout() time.Duration {
	return c.timeout
}

func (c *caller[Out]) Output() Out {
	c.wait.Wait()
	return c.output
}

func (c *caller[Out]) Error() error {
	c.wait.Wait()
	return c.error
}

func (c *caller[Out]) Duration() time.Duration {
	c.wait.Wait()
	return c.duration
}

func (c *caller[Out]) Timeouted() bool {
	c.wait.Wait()
	return c.timeouted
}

func (c *caller[Out]) Recovered() any {
	c.wait.Wait()
	return c.recovered
}

func (c *caller[Out]) Success() error {
	c.wait.Wait()
	if c.timeouted {
		return errors.New("async call timeout")
	}
	if c.recovered != nil {
		return errors.New("async call panic")
	}
	return c.error
}

func (c *caller[Out]) Call() Result[Out] {
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

func (c *caller[Out]) callFunc() {
	start := time.Now()
	defer func() {
		if r := recover(); r != nil {
			c.recovered = r
		}
		c.duration = time.Since(start)
	}()
	c.output, c.error = c.fn()
}
