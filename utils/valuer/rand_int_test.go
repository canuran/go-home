package valuer

import (
	"fmt"
	"math"
	"math/big"
	"math/rand"
	"sync"
	"testing"
	"time"
)

func TestRandInt64(t *testing.T) {
	fmt.Println(RandInt64())
	fmt.Println(RandInt64())
	fmt.Println(TimeOfInt64(RandInt64()))
	fmt.Println(TimeOfInt64(math.MaxInt64))
}

// 模拟1万QPS左右10次未出现重复
// 提升到2万QPS左右出现个别重复
func TestRandInt64Repeats(t *testing.T) {
	for i := 0; i < 10; i++ {
		TestRandInt64Repeat(t)
		fmt.Println()
	}
}

func TestRandInt64Repeat(t *testing.T) {
	total := 11000
	var m sync.Map
	var wg sync.WaitGroup
	wg.Add(total)

	// 并发生成并计时
	now := time.Now()
	for i := 0; i < total; i++ {
		go func() {
			time.Sleep(time.Millisecond * time.Duration(rand.Int31n(1000)))
			m.Store(RandInt64(), 1)
			wg.Done()
		}()
	}
	wg.Wait()
	duration := time.Since(now)

	// 统计生成结果
	var count int
	m.Range(func(key, value any) bool {
		count++
		return true
	})
	fmt.Println("总数:", total)
	fmt.Println("QPS:", int64(total)*int64(time.Second)/int64(duration))
	fmt.Println("唯一:", count)
	fmt.Println("重复:", total-count)
}

// 约 30 ns/op (windows i5-10400F)
func BenchmarkRandInt64(b *testing.B) {
	for i := 0; i < b.N; i++ {
		_ = RandInt64()
	}
}

func TestRandBigint(t *testing.T) {
	fmt.Println(RandBigint())
	fmt.Println(RandBigint())
	fmt.Println(RandBigint().Text(16))
	fmt.Println(RandBigint().Text(36))
	fmt.Println(TimeOfBigint(RandBigint()))

	i, _ := big.NewInt(0).SetString("99999999999999999999999999999999", 10)
	fmt.Println(TimeOfBigint(i)) // 10进制32位可使用到2313年

	i, _ = big.NewInt(0).SetString("fffffffffffffffffffffffffff", 16)
	fmt.Println(TimeOfBigint(i)) // 16进制26位可使用到3084年

	i, _ = big.NewInt(0).SetString("zzzzzzzzzzzzzzzzzzzzz", 36)
	fmt.Println(TimeOfBigint(i)) // 36进制21位可使用到3623年
}

// 约 200 ns/op (windows i5-10400F)
func BenchmarkRandBigint(b *testing.B) {
	for i := 0; i < b.N; i++ {
		_ = RandBigint()
	}
}

func TestRandTimeLike(t *testing.T) {
	fmt.Println(RandTimeLike())
	fmt.Println(RandTimeLike())
	fmt.Println(RandTimeLike())
	fmt.Println(TimeOfTimeLike(RandTimeLike()))
}

// 约 300 ns/op (windows i5-10400F)
func BenchmarkRandTimeLike(b *testing.B) {
	for i := 0; i < b.N; i++ {
		_ = RandTimeLike()
	}
}
