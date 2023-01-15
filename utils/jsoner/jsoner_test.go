package jsoner

import (
	"bytes"
	"fmt"
	"github.com/stretchr/testify/assert"
	"strings"
	"testing"
	"time"
)

type test struct {
	Int64  int64
	Uint64 uint64
	String string
	Bytes  []byte
	Bytes2 []byte
	Date   time.Time
	Date2  time.Time
}

func TestJsonExtensions(t *testing.T) {
	max := 32
	jsonAPI := NewAPI().
		MaxStringFieldLen(max).
		MaxSliceFieldLen(max).
		EncodeIntegerSafely().
		DecodeGeneralDate()

	data := test{
		Int64:  JsonSafeMinInteger - 1,
		Uint64: JsonSafeMaxInteger + 1,
		String: strings.Repeat("a", max*2),
		Bytes:  bytes.Repeat([]byte{'b'}, max*2),
		Date:   time.Now(),
	}

	str, err := jsonAPI.MarshalToString(data)
	assert.Nil(t, err)
	fmt.Println(str)

	data2 := test{}
	err = jsonAPI.UnmarshalFromString(str, &data2)
	assert.Nil(t, err)
	assert.Equal(t, data.Int64, data2.Int64)
	assert.Equal(t, data.Uint64, data2.Uint64)
	assert.Equal(t, data.String[:max], data2.String)
	assert.Equal(t, data.Bytes[:max], data2.Bytes)
	assert.Equal(t, data.Bytes2, data2.Bytes2)
	assert.Equal(t, data.Date.UnixNano(), data2.Date.UnixNano())
	assert.Equal(t, data.Date2, data2.Date2)
}
