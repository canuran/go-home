package uuidx

import (
	"crypto/rand"
	"math/big"
	"time"
)

type Id struct {
	high time.Time
	low  *big.Int
}

var (
	// 10的18次方最多60位
	lowBitMask = big.NewInt(1<<60 - 1)
	tenPower18 = big.NewInt(1000000000000000000)
)

func NewId() Id {
	return NewIdWithTime(time.Now())
}

func NewIdWithTime(t time.Time) Id {
	low, err := rand.Int(rand.Reader, tenPower18)
	if err != nil {
		panic(err)
	}
	return Id{high: t, low: low}
}

func ParseBigint(i *big.Int) Id {
	return Id{
		high: time.UnixMilli(new(big.Int).Rsh(i, 60).Int64()),
		low:  new(big.Int).And(i, lowBitMask),
	}
}

func ParseTimeLike(i *big.Int) Id {
	intTime := new(big.Int).Div(i, tenPower18).Int64()
	s := int(intTime % 100)
	mi := int(intTime / 100 % 100)
	h := int(intTime / 10000 % 100)
	d := int(intTime / 1000000 % 100)
	m := time.Month(intTime / 100000000 % 100)
	y := int(intTime / 10000000000)
	return Id{
		high: time.Date(y, m, d, h, mi, s, 0, time.Local),
		low:  new(big.Int).Mod(i, tenPower18),
	}
}

// Bigint 使用Unix时间毫秒+60位随机数
// 10进制32位上限至4718年，用Mysql的Decimal长度14字节
// 16进制26位上限至2527年，36进制20位上限至2337年
func (id Id) Bigint() *big.Int {
	second := id.high.UnixMilli()
	high := big.NewInt(second)
	high = high.Lsh(high, 60)
	return high.Or(high, id.low)
}

// TimeLike 使用10进制时的年月日时分秒+60位随机数
// 适用于订单号、日志ID等，9999年之前都是32位10进制
func (id Id) TimeLike() *big.Int {
	y, m, d := id.high.Date()
	h, mi, s := id.high.Hour(), id.high.Minute(), id.high.Second()
	intTime := int64(y)*10000000000 + int64(m)*100000000 + int64(d*1000000+h*10000+mi*100+s)
	high := big.NewInt(intTime)
	high = high.Mul(high, tenPower18)
	return high.Add(high, id.low)
}

func (id Id) Time() time.Time {
	return id.high
}

func (id Id) Low() *big.Int {
	return id.low
}
