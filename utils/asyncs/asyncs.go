package asyncs

import (
	"fmt"
	"sync"
	"time"
)

type TimeoutErr struct {
	error
	Timeout time.Duration
}
type PanicErr struct {
	error
	Recover interface{}
}

func newTimeoutErr(timeout time.Duration) TimeoutErr {
	return TimeoutErr{
		error:   fmt.Errorf("call timeout during %v", timeout),
		Timeout: timeout,
	}
}

func newRecoverErr(r interface{}) PanicErr {
	return PanicErr{
		error:   fmt.Errorf("call recover with panic"),
		Recover: r,
	}
}

/*
异步调用并立即返回 channel 和 error channel
如果出现 panic，error channel 将收到 PanicErr
*/
func AsyncCall(call func() (interface{}, error)) (<-chan interface{}, <-chan error) {
	resultChan := make(chan interface{}, 1)
	errorChan := make(chan error, 1)
	go func() {
		defer func() {
			if r := recover(); r != nil {
				resultChan <- nil
				errorChan <- newRecoverErr(r)
			}
		}()
		callRes, callErr := call()
		resultChan <- callRes
		errorChan <- callErr
	}()
	return resultChan, errorChan
}

/*
异步调用多个方法并立即返回多个 channel 和 error channel
对于每个方法，如果出现 panic，error channel 将收到 PanicErr
*/
func AsyncCalls(calls ...func() (interface{}, error)) ([]<-chan interface{}, []<-chan error) {
	// 创建完成通道
	resultChans := make([]<-chan interface{}, 0, len(calls))
	errorChans := make([]<-chan error, 0, len(calls))

	// 逐个发起异步调用然后返回
	for _, call := range calls {
		resultChan, errorChan := AsyncCall(call)
		errorChans = append(errorChans, errorChan)
		resultChans = append(resultChans, resultChan)
	}
	return resultChans, errorChans
}

/**
并行调用多个方法直到所有方法都返回
对于每个方法，如果出现 panic，error 将会是 PanicErr
*/
func ParallelCalls(calls ...func() (interface{}, error)) ([]interface{}, []error) {
	// 创建完成通道
	results := make([]interface{}, 0, len(calls))
	errors := make([]error, 0, len(calls))
	resultChans, errorChans := AsyncCalls(calls...)

	// 直到所有异步调用完成
	for i, errorChan := range errorChans {
		errors = append(errors, <-errorChan)
		results = append(results, <-resultChans[i])
	}
	return results, errors
}

/*
异步调用并立即返回 channel 和 error channel
如果出现 panic，error channel 将收到 PanicErr
如果调用超时，error channel 将收到 TimeoutErr
*/
func AsyncTimeoutCall(timeout time.Duration,
	call func() (interface{}, error)) (<-chan interface{}, <-chan error) {
	// 创建完成通道
	doneChan := make(chan bool, 1)
	resultChan := make(chan interface{}, 1)
	errorChan := make(chan error, 1)
	var once sync.Once
	go func() {
		defer func() {
			doneChan <- true
			if r := recover(); r != nil {
				once.Do(func() {
					resultChan <- nil
					errorChan <- newRecoverErr(r)
				})
			}
		}()
		callRes, callErr := call()
		once.Do(func() {
			resultChan <- callRes
			errorChan <- callErr
		})
	}()
	// 创建超时通道
	timer := time.After(timeout)
	go func() {
		select {
		case <-doneChan:
			// doneChan先到说明正常完成
		case <-timer:
			// 定时器先到说明超时了
			once.Do(func() {
				resultChan <- nil
				errorChan <- newTimeoutErr(timeout)
			})
		}
	}()
	return resultChan, errorChan
}

/*
异步调用多个方法并立即返回多个 channel 和 error channel
如果出现 panic，error channel 将收到 PanicErr
如果调用超时，error channel 将收到 TimeoutErr
*/
func AsyncTimeoutCalls(timeout time.Duration,
	calls ...func() (interface{}, error)) ([]<-chan interface{}, []<-chan error) {
	// 创建完成通道
	resultChans := make([]<-chan interface{}, 0, len(calls))
	errorChans := make([]<-chan error, 0, len(calls))

	// 逐个发起异步调用然后返回
	for _, call := range calls {
		resultChan, errorChan := AsyncTimeoutCall(timeout, call)
		errorChans = append(errorChans, errorChan)
		resultChans = append(resultChans, resultChan)
	}
	return resultChans, errorChans
}

/**
并行调用多个方法直到所有方法都返回
对于每个方法，如果出现 panic，error 将会是 PanicErr
对于每个方法，如果调用超时，error 将会是 TimeoutErr
*/
func ParallelTimeoutCalls(timeout time.Duration,
	calls ...func() (interface{}, error)) ([]interface{}, []error) {
	// 创建完成通道
	results := make([]interface{}, 0, len(calls))
	errors := make([]error, 0, len(calls))
	resultChans, errorChans := AsyncTimeoutCalls(timeout, calls...)

	// 直到所有异步调用完成
	for i, errorChan := range errorChans {
		errors = append(errors, <-errorChan)
		results = append(results, <-resultChans[i])
	}
	return results, errors
}
