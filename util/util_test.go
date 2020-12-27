package util

import (
	"fmt"
	"testing"
)

func TestLogIfErr(t *testing.T) {
	LogIfErr(fmt.Errorf("hello"))
}
