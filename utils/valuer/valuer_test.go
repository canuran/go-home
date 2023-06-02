package valuer

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/stretchr/testify/assert"
	"go/doc"
	"testing"
	"time"
)

func TestElemOr(t *testing.T) {
	str := "sss"
	strP := &str
	fmt.Println(ElemOr(strP, ""))
	fmt.Println(ElemOr(ExistOr(nil, strP), ""))
	fmt.Println(ElemOr(nil, "123"))
}

func TestInt64ify(t *testing.T) {
	num := json.Number("123")
	numP := &num
	numPP := &numP
	fmt.Println(Int64ify(&numPP))
	fmt.Println(Int64ify(int32(123)))
	fmt.Println(Int64ify(float64(123)))
	fmt.Println(Int64ify(struct{}{}))
	fmt.Println(Int64ify(&doc.Value{}))
}

func TestFloat64ify(t *testing.T) {
	num := "123"
	numP := &num
	numPP := &numP
	fmt.Println(Float64ify(&numPP))
	fmt.Println(Float64ify(struct{}{}))
	fmt.Println(Float64ify(&doc.Value{}))
}

func TestStringify(t *testing.T) {
	fmt.Println(Stringify(123))
	fmt.Println(Stringify(json.Number("123")))
	fmt.Println(Stringify(errors.New("123")))
	fmt.Println(Stringify(struct{}{}))
	fmt.Println(Stringify(&doc.Value{}))
}

func BenchmarkInt64Slice(b *testing.B) {
	var str = "-123,abc,12132,4354-2343,23243,ewdsfd,23323,5342"
	for i := 0; i < b.N; i++ {
		_ = Int64Slice([]rune(str))
	}
}

func TestParseGeneralDate(t *testing.T) {
	zeroDate := ParseGeneralDate([]rune(""))
	fmt.Println(zeroDate.Format(time.RFC3339Nano))
	assert.Equal(t, zeroDate, time.Date(1, 1, 1,
		0, 0, 0, 0, time.Local))

	now := time.Now().UTC()
	fmt.Println(now.Format(time.RFC3339Nano))
	assert.Equal(t, now, ParseGeneralDate([]rune(now.Format(time.RFC3339Nano))))

	dates := []string{
		"20220821191838.123456789",
		"2022年8月21日19点18分38秒123456789纳秒",
		"2022-8-21T19:18Z38.123456789",
		"Time2022year08month21day19hour18mm38sss123456789SSS",
		"日期：20220821，时间：19:18:38.123456789",
	}
	except := time.Date(2022, 8, 21,
		19, 18, 38, 123456789, time.Local)
	for _, date := range dates {
		result := ParseGeneralDate([]rune(date))
		fmt.Println(result.Format(time.RFC3339Nano))
		assert.Equal(t, except, result, date)
	}

	dates = []string{
		"20220821191838.123456789Z",
		"2022-8-21T19:18:38.123456789Z",
		"日期：20220821，时间：19:18:38.123456789Z",
	}
	except = time.Date(2022, 8, 21,
		19, 18, 38, 123456789, time.UTC)
	for _, date := range dates {
		result := ParseGeneralDate([]rune(date))
		fmt.Println(result.Format(time.RFC3339Nano))
		assert.Equal(t, except, result, date)
	}

	utcDate := ParseGeneralDate([]rune("2022-8-21T19:18:38.123456789+8:30"))
	fmt.Println(utcDate.Format(time.RFC3339Nano))
	assert.Equal(t, utcDate, time.Date(2022, 8, 21, 19, 18,
		38, 123456789, time.FixedZone("", 8*3600+30*60)))

	utcDate = ParseGeneralDate([]rune("2022-8-21T19:18:38-8:30"))
	fmt.Println(utcDate.Format(time.RFC3339Nano))
	assert.Equal(t, utcDate, time.Date(2022, 8, 21, 19, 18,
		38, 0, time.FixedZone("", -8*3600-30*60)))

	utcDate = ParseGeneralDate([]rune("2022-8-21T19:18:38Z"))
	fmt.Println(utcDate.Format(time.RFC3339Nano))
	assert.Equal(t, utcDate, time.Date(2022, 8, 21, 19, 18,
		38, 0, time.UTC))
}

func BenchmarkParseGeneralDate(b *testing.B) {
	var str = "2022-08-21T19:18:38.123456789Z"
	for i := 0; i < b.N; i++ {
		_ = ParseGeneralDate([]rune(str))
	}
}

func BenchmarkParseDate(b *testing.B) {
	var str = "2022-08-21T19:18:38.123456789Z"
	for i := 0; i < b.N; i++ {
		_, _ = time.Parse(time.RFC3339Nano, str)
	}
}
