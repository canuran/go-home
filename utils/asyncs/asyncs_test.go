package asyncs

import (
	"fmt"
	"testing"
	"time"
)

func TestAsyncCall(t *testing.T) {
	now := time.Now()
	result := AsyncCall(func() (interface{}, error) {
		time.Sleep(time.Millisecond * 100)
		return "ok", nil
	})

	fmt.Println("AsyncCall success:", result.Success())
	fmt.Println("AsyncCall success result:", result.SuccessResult())
	fmt.Println("AsyncCall duration:", result.Duration())
	fmt.Println("AsyncCall wait:", time.Since(now))

	fmt.Println()
	now = time.Now()
	result = AsyncCall(func() (interface{}, error) {
		panic("boom")
	})

	fmt.Println("AsyncCall panic success:", result.Success())
	fmt.Println("AsyncCall panic success result:", result.SuccessResult())
	fmt.Println("AsyncCall panic recover:", result.Panic())
	fmt.Println("AsyncCall panic duration:", result.Duration())
	fmt.Println("AsyncCall panic wait:", time.Since(now))

	fmt.Println()
	now = time.Now()
	result = AsyncTimeoutCall(func() (interface{}, error) {
		time.Sleep(time.Millisecond * 150)
		return "ok", nil
	}, time.Millisecond*100)

	time.Sleep(time.Millisecond * 200)
	fmt.Println("AsyncTimeoutCall success:", result.Success())
	fmt.Println("AsyncTimeoutCall success result:", result.SuccessResult())
	fmt.Println("AsyncTimeoutCall duration:", result.Duration())
	fmt.Println("AsyncTimeoutCall wait:", time.Since(now))
}
