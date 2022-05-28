package async

import (
	"errors"
	"fmt"
	"reflect"
	"sync"
	"time"
)

func NewBuilder(function any) Builder {
	return &caller{
		funcValue: reflect.ValueOf(function),
	}
}

type Builder interface {
	SetTimeout(timeout time.Duration) Builder
	Call(args ...any) Result
}

type Result interface {
	FuncValue() reflect.Value
	Timeout() time.Duration
	Results() []any
	Duration() time.Duration
	Timeouted() bool
	Recovered() any
	Error() error
}

type caller struct {
	funcValue reflect.Value
	timeout   time.Duration
	duration  time.Duration
	rwLock    sync.RWMutex
	results   []any
	recovered any
	timeouted bool
	error     error
}

func (c *caller) SetTimeout(timeout time.Duration) Builder {
	c.timeout = timeout
	return c
}

func (c *caller) FuncValue() reflect.Value {
	return c.funcValue
}

func (c *caller) Timeout() time.Duration {
	return c.timeout
}

func (c *caller) waitLock() *caller {
	c.rwLock.RLock()
	c.rwLock.RUnlock()
	return c
}

func (c *caller) Results() []any {
	return c.waitLock().results
}

func (c *caller) Duration() time.Duration {
	return c.waitLock().duration
}

func (c *caller) Timeouted() bool {
	return c.waitLock().timeouted
}

func (c *caller) Recovered() any {
	return c.waitLock().recovered
}

func (c *caller) Error() error {
	c.waitLock()
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

func (c *caller) Call(args ...any) Result {
	start := time.Now()
	c.rwLock.Lock()
	if c.timeout > 0 {
		// 只执行一次结束逻辑
		var once sync.Once
		go func() {
			c.callFunction(args...)
			// 正常结束
			once.Do(func() {
				c.duration = time.Since(start)
				c.rwLock.Unlock()
			})
		}()

		time.AfterFunc(c.timeout, func() {
			// 超时结束
			once.Do(func() {
				c.timeouted = true
				c.duration = time.Since(start)
				c.rwLock.Unlock()
			})
		})

	} else {
		go func() {
			c.callFunction(args...)
			c.duration = time.Since(start)
			c.rwLock.Unlock()
		}()
	}
	return c
}

func (c *caller) callFunction(args ...any) {
	if !c.funcValue.IsValid() {
		c.error = errors.New("invalid func value")
		return
	}

	funcType := c.funcValue.Type()
	if funcType.Kind() != reflect.Func {
		c.error = errors.New("type must be func")
		return
	}

	defer func() {
		if r := recover(); r != nil {
			c.recovered = r
		}
	}()

	// 处理参数
	numIn := funcType.NumIn()
	inputs := make([]reflect.Value, 0, numIn)
	for i := 0; i < numIn; i++ {
		inType := funcType.In(i)

		// 处理可变长参数
		if i == numIn-1 && funcType.IsVariadic() {
			elemType := inType.Elem()
			for ; i < len(args); i++ {
				arg := args[i]

				// 允许使用Slice代替变长参数
				if arg != nil && inType == reflect.TypeOf(arg) {
					value := reflect.ValueOf(arg)
					for j := 0; j < value.Len(); j++ {
						inputs = append(inputs, value.Index(j))
					}
				} else {
					inputs = append(inputs, reflectValue(elemType, arg))
				}
			}
			break
		}

		if i < len(args) {
			inputs = append(inputs, reflectValue(inType, args[i]))
		} else {
			inputs = append(inputs, reflect.Zero(inType))
		}
	}

	// 调用函数返回结果
	values := c.funcValue.Call(inputs)
	c.results = make([]any, len(values))
	for i, value := range values {
		c.results[i] = value.Interface()
	}
}

func reflectValue(typ reflect.Type, value any) reflect.Value {
	if value == nil {
		return reflect.Zero(typ)
	}
	return reflect.ValueOf(value)
}
