package uuidx

import (
	"fmt"
	"github.com/stretchr/testify/assert"
	"math/big"
	"testing"
	"time"
)

func TestBigint(t *testing.T) {
	// 观察生成结果
	fmt.Println(NewId().Bigint())
	fmt.Println(NewId().Bigint())
	fmt.Println(NewId().Bigint().Text(16))
	fmt.Println(NewId().Bigint().Text(36))
	fmt.Println("二进制位数", NewId().Bigint().BitLen())

	// 测试生成与还原
	tim := time.Now()
	id := NewIdWithTime(tim)
	id2 := ParseBigint(id.Bigint())
	fmt.Println(id2.Bigint(), "=", id.Bigint())
	assert.Equal(t, id2.Bigint(), id.Bigint())
	assert.Equal(t, id.Time().UnixMilli(), tim.UnixMilli())

	// 观察当前时间与最大时间
	fmt.Println(ParseBigint(NewId().Bigint()).Time())
	i, _ := big.NewInt(0).SetString("9999999999999999999999999999999", 10)
	fmt.Println("31位10进制时间上限", ParseBigint(i).Time()) // 10进制31位上限至2244年
	i, _ = big.NewInt(0).SetString("ffffffffffffffffffffffffff", 16)
	fmt.Println("26位16进制时间上限", ParseBigint(i).Time()) // 16进制26位上限至2527年
	i, _ = big.NewInt(0).SetString("zzzzzzzzzzzzzzzzzzzz", 36)
	fmt.Println("20位36进制时间上限", ParseBigint(i).Time()) // 36进制20位上限至2337年
}

// 约 650 ns/op (windows i5-10400F)
func BenchmarkBigint(b *testing.B) {
	for i := 0; i < b.N; i++ {
		_ = NewId().Bigint()
	}
}

func TestTimeLike(t *testing.T) {
	// 观察生成结果
	fmt.Println(NewId().TimeLike())
	fmt.Println(NewId().TimeLike())
	fmt.Println("二进制位数", NewId().TimeLike().BitLen())

	// 测试生成与还原
	tim := time.Now()
	id := NewIdWithTime(tim)
	id2 := ParseTimeLike(id.TimeLike())
	fmt.Println(id2.TimeLike(), "=", id.TimeLike())
	assert.Equal(t, id2.TimeLike(), id.TimeLike())
	assert.Equal(t, id.Time().UnixMilli(), tim.UnixMilli())

	// 观察当前时间
	fmt.Println(ParseTimeLike(NewId().TimeLike()).Time())
}

// 约 720 ns/op (windows i5-10400F)
func BenchmarkTimeLike(b *testing.B) {
	for i := 0; i < b.N; i++ {
		_ = NewId().TimeLike()
	}
}
