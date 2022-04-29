package asyncs

import (
	"sync"
	"time"
)

func AsyncCall(call func() (any, error)) *AsyncResult {
	return AsyncTimeoutCall(call, 0)
}

func AsyncTimeoutCall(call func() (any, error), timeout time.Duration) *AsyncResult {
	start := time.Now()
	asyncResult := &AsyncResult{}
	asyncResult.rwLock.Lock()
	if timeout > 0 {
		var once sync.Once
		go func() {
			defer func() {
				if r := recover(); r != nil {
					asyncResult.panic = r
				}
				once.Do(func() {
					asyncResult.duration = time.Since(start)
					asyncResult.rwLock.Unlock()
				})
			}()
			asyncResult.result, asyncResult.error = call()
		}()
		time.AfterFunc(timeout, func() {
			once.Do(func() {
				asyncResult.timeout = true
				asyncResult.duration = time.Since(start)
				asyncResult.rwLock.Unlock()
			})
		})
	} else {
		go func() {
			defer func() {
				if r := recover(); r != nil {
					asyncResult.panic = r
				}
				asyncResult.duration = time.Since(start)
				asyncResult.rwLock.Unlock()
			}()
			asyncResult.result, asyncResult.error = call()
		}()
	}
	return asyncResult
}

type AsyncResult struct {
	rwLock   sync.RWMutex
	result   any
	error    error
	panic    any
	timeout  bool
	duration time.Duration
}

func (r *AsyncResult) Result() any {
	r.rwLock.RLock()
	defer r.rwLock.RUnlock()
	return r.result
}

func (r *AsyncResult) Error() error {
	r.rwLock.RLock()
	defer r.rwLock.RUnlock()
	return r.error
}

func (r *AsyncResult) Panic() any {
	r.rwLock.RLock()
	defer r.rwLock.RUnlock()
	return r.panic
}

func (r *AsyncResult) Timeout() bool {
	r.rwLock.RLock()
	defer r.rwLock.RUnlock()
	return r.timeout
}

func (r *AsyncResult) Duration() time.Duration {
	r.rwLock.RLock()
	defer r.rwLock.RUnlock()
	return r.duration
}

// Success 异步执行成功
func (r *AsyncResult) Success() bool {
	r.rwLock.RLock()
	defer r.rwLock.RUnlock()
	return r.error == nil && r.panic == nil && !r.timeout
}

// SuccessResult 成功则返回结果，否则返回nil
func (r *AsyncResult) SuccessResult() any {
	if r.Success() {
		return r.result
	}
	return nil
}
