package valuer

import (
	"math"
	"math/rand"
	"time"
)

// NewRandId 用于生成随机ID，符合趋势递增
// 连续10次测试QPS在1万以上时才会出现个别重复ID
// 时间秒数占用高33位，时间上限为：2242-03-16
func NewRandId() int64 {
	return NewRandIdByTime(time.Now())
}

// NewRandIdByTime see NewRandId 时间精确到秒
func NewRandIdByTime(t time.Time) int64 {
	second := t.Unix()
	randInt := int64(rand.Int31())
	return (second << 30) | (randInt & (math.MaxInt32 >> 1))
}

// GetTimeByRandId 时间精确到秒
func GetTimeByRandId(id int64) time.Time {
	return time.Unix(id>>30, 0)
}
