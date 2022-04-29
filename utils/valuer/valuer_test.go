package valuer

import (
	"encoding/json"
	"fmt"
	"testing"
)

func TestInt64ify(t *testing.T) {
	num := json.Number("123")
	numP := &num
	numPP := &numP
	fmt.Println(Int64ify(&numPP))
}

func TestFloat64ify(t *testing.T) {
	num := "123"
	numP := &num
	numPP := &numP
	fmt.Println(Float64ify(&numPP))
}
