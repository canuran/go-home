package errorer

import (
	"fmt"
	"testing"
)

func TestHandlerError(t *testing.T) {
	HandlerError(fmt.Errorf("hello1"))
	HandlerError(fmt.Errorf("hello2"))
	HandlerError(fmt.Errorf("hello3"))
}
