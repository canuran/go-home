package valuer

import (
	"math/big"
	"math/rand"
	"time"
)

// RandInt64 用于生成随机ID，符合趋势递增
// 连续10次测试QPS在1万以上时才会出现个别重复ID
// 时间秒数占用高33位，时间上限为：2242-03-16
func RandInt64() int64 {
	return RandInt64WithTime(time.Now())
}

// RandInt64WithTime see RandInt64 时间精确到秒
func RandInt64WithTime(t time.Time) int64 {
	second := t.Unix()
	randInt := int64(rand.Int31())
	return (second << 30) | (randInt & (1<<30 - 1))
}

// TimeOfInt64 时间精确到秒
func TimeOfInt64(i int64) time.Time {
	return time.Unix(i>>30, 0)
}

// RandBigint 上限为第292278994年，可认为无上限
// 采用时间毫秒+63位随机数组成，每秒可生成千亿个且不重复
// 10进制32位上限为2313年，用Mysql的Decimal长度14字节
// 16进制27位上限为3084年，36进制21位上限为3623年
func RandBigint() *big.Int {
	return RandBigintWithTime(time.Now())
}

// RandBigintWithTime see RandInt64 时间精确到毫秒
func RandBigintWithTime(t time.Time) *big.Int {
	second := t.UnixMilli()
	randInt := rand.Int63()
	high := big.NewInt(second)
	high = high.Lsh(high, 63)
	return high.Or(high, big.NewInt(randInt))
}

// TimeOfBigint 时间精确到毫秒
func TimeOfBigint(i *big.Int) time.Time {
	return time.UnixMilli(i.Rsh(i, 63).Int64())
}

// RandTimeLike 表示为10进制时以年月日时分秒开头
// 可以快速读取日期，9999年之前都是32位10进制
func RandTimeLike() *big.Int {
	return RandRandTimeLikeWithTime(time.Now())
}

var tenPower18 = big.NewInt(1000000000000000000)

func RandRandTimeLikeWithTime(t time.Time) *big.Int {
	y, m, d := t.Date()
	h, mi, s := t.Hour(), t.Minute(), t.Second()
	order := int64(y)*10000000000 + int64(m)*100000000 + int64(d*1000000+h*10000+mi*100+s)
	randInt := rand.Int63n(1000000000000000000)
	high := big.NewInt(order)
	high = high.Mul(high, tenPower18)
	return high.Add(high, big.NewInt(randInt))
}

// TimeOfTimeLike 时间精确到秒
func TimeOfTimeLike(i *big.Int) time.Time {
	order := i.Div(i, tenPower18).Int64()
	s := int(order % 100)
	mi := int(order / 100 % 100)
	h := int(order / 10000 % 100)
	d := int(order / 1000000 % 100)
	m := time.Month(order / 100000000 % 100)
	y := int(order / 10000000000)
	return time.Date(y, m, d, h, mi, s, 0, time.Local)
}
