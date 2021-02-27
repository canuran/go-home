package asyncs

import (
	"errors"
	"fmt"
	"testing"
	"time"
)

// 顺序打印
func TestParallelCalls(t *testing.T) {
	now := time.Now()

	results, errs := ParallelCalls(
		func() (interface{}, error) {
			time.Sleep(time.Millisecond * 300)
			return "success1", nil
		},
		func() (interface{}, error) {
			time.Sleep(time.Millisecond * 500)
			return "success2", nil
		},
		func() (interface{}, error) {
			return nil, errors.New("failure")
		},
		func() (interface{}, error) {
			panic("boom")
		})

	since := time.Since(now)
	fmt.Println(since)

	for i, err := range errs {
		fmt.Println("err", i+1, err)
		fmt.Println("result", i+1, results[i])
		_, ok := err.(PanicErr)
		fmt.Println("recover", ok)
		_, ok = err.(TimeoutErr)
		fmt.Println("timeout", ok)
		fmt.Println()
	}
}

// 顺序打印
func TestParallelTimeoutCalls(t *testing.T) {
	now := time.Now()

	results, errs := ParallelTimeoutCalls(time.Millisecond*200,
		func() (interface{}, error) {
			time.Sleep(time.Millisecond * 300)
			return "success1", nil
		},
		func() (interface{}, error) {
			time.Sleep(time.Millisecond * 100)
			return "success2", nil
		},
		func() (interface{}, error) {
			return nil, errors.New("failure")
		},
		func() (interface{}, error) {
			panic("boom")
		})

	since := time.Since(now)
	fmt.Println(since)

	for i, err := range errs {
		fmt.Println("err", i+1, err)
		fmt.Println("result", i+1, results[i])
		_, ok := err.(PanicErr)
		fmt.Println("recover", ok)
		_, ok = err.(TimeoutErr)
		fmt.Println("timeout", ok)
		fmt.Println()
	}
}

// 顺序打印
func TestAsyncChanCallOrder(t *testing.T) {
	result1, errChan1 := AsyncTimeoutCall(time.Millisecond*100, func() (interface{}, error) {
		time.Sleep(time.Millisecond * 200)
		return "success1", nil
	})

	result2, errChan2 := AsyncTimeoutCall(time.Millisecond*200, func() (interface{}, error) {
		time.Sleep(time.Millisecond * 100)
		return "success2", nil
	})

	result3, errChan3 := AsyncTimeoutCall(time.Millisecond*10, func() (interface{}, error) {
		return nil, errors.New("failure")
	})

	result4, errChan4 := AsyncTimeoutCall(time.Millisecond*10, func() (interface{}, error) {
		panic("boom")
	})

	err1 := <-errChan1
	fmt.Println("err1", err1)
	fmt.Println("result1", <-result1)
	err2 := <-errChan2
	fmt.Println("err2", err2)
	fmt.Println("result2", <-result2)
	err3 := <-errChan3
	fmt.Println("err3", err3)
	fmt.Println("result3", <-result3)
	err4 := <-errChan4
	fmt.Println("err4", err4)
	fmt.Println("result4", <-result4)
}

// 先完成先打印
func TestAsyncChanCallSelect(t *testing.T) {
	result1, errChan1 := AsyncTimeoutCall(time.Millisecond*100, func() (interface{}, error) {
		time.Sleep(time.Millisecond * 200)
		return "success1", nil
	})

	result2, errChan2 := AsyncTimeoutCall(time.Millisecond*200, func() (interface{}, error) {
		time.Sleep(time.Millisecond * 100)
		return "success2", nil
	})

	result3, errChan3 := AsyncTimeoutCall(time.Millisecond*10, func() (interface{}, error) {
		return nil, errors.New("failure")
	})

	result4, errChan4 := AsyncTimeoutCall(time.Millisecond*10, func() (interface{}, error) {
		panic("boom")
	})

	for i := 0; i < 4; i++ {
		select {
		case err1 := <-errChan1:
			fmt.Println("err1", err1)
			fmt.Println("result1", <-result1)
		case err2 := <-errChan2:
			fmt.Println("err2", err2)
			fmt.Println("result2", <-result2)
		case err3 := <-errChan3:
			fmt.Println("err3", err3)
			fmt.Println("result3", <-result3)
		case err4 := <-errChan4:
			fmt.Println("err4", err4)
			fmt.Println("result4", <-result4)
		}
	}
}

// 顺序打印
func TestAsyncCallOrder(t *testing.T) {
	result1, errChan1 := AsyncCall(func() (interface{}, error) {
		time.Sleep(time.Millisecond * 200)
		return "success1", nil
	})

	result2, errChan2 := AsyncCall(func() (interface{}, error) {
		time.Sleep(time.Millisecond * 100)
		return "success2", nil
	})

	result3, errChan3 := AsyncCall(func() (interface{}, error) {
		return nil, errors.New("failure")
	})

	result4, errChan4 := AsyncCall(func() (interface{}, error) {
		panic("boom")
	})

	err1 := <-errChan1
	fmt.Println("err1", err1)
	fmt.Println("result1", <-result1)
	err2 := <-errChan2
	fmt.Println("err2", err2)
	fmt.Println("result2", <-result2)
	err3 := <-errChan3
	fmt.Println("err3", err3)
	fmt.Println("result3", <-result3)
	err4 := <-errChan4
	fmt.Println("err4", err4)
	fmt.Println("result4", <-result4)
}
