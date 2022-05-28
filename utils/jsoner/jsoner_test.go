package jsoner

import (
	"fmt"
	"strings"
	"testing"
)

func TestMarshalLogString(t *testing.T) {
	data := struct {
		Int64  int64
		Uint64 uint64
		String string
	}{
		Int64:  JsonSafeMinInteger - 1,
		Uint64: JsonSafeMaxInteger + 1,
		String: strings.Repeat("1234567890", 20),
	}

	fmt.Println(MarshalLogString(data))

}
