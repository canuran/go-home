package valuer

import (
	"fmt"
	"reflect"
	"strconv"
	"time"
)

func If[T any](value bool, yes, no T) T {
	if value {
		return yes
	}
	return no
}

func ExistOr[T any](value *T, or *T) *T {
	if value == nil {
		return or
	}
	return value
}

func ElemOr[T any](value *T, or T) T {
	if value == nil {
		return or
	}
	return *value
}

func Int64ify(input any) int64 {
	if input == nil {
		return 0
	}
	switch input.(type) {
	case int:
		return int64(input.(int))
	case uint:
		return int64(input.(uint))
	case int8:
		return int64(input.(int8))
	case uint8:
		return int64(input.(uint8))
	case int16:
		return int64(input.(int16))
	case uint16:
		return int64(input.(uint16))
	case int32:
		return int64(input.(int32))
	case uint32:
		return int64(input.(uint32))
	case int64:
		return input.(int64)
	case uint64:
		return int64(input.(uint64))
	case float32:
		return int64(input.(float32))
	case float64:
		return int64(input.(float64))
	case string:
		return int64(ParseFloat(input.(string)))
	case time.Time:
		return input.(time.Time).UnixMilli()
	case fmt.Stringer:
		return int64(ParseFloat(input.(fmt.Stringer).String()))
	case bool:
		return If[int64](input.(bool), 1, 0)
	default:
		value := reflect.ValueOf(input)
		if value.Kind() == reflect.Pointer {
			return Int64ify(value.Elem().Interface())
		}
		return 0
	}
}

func Float64ify(input any) float64 {
	if input == nil {
		return 0
	}
	switch input.(type) {
	case int:
		return float64(input.(int))
	case uint:
		return float64(input.(uint))
	case int8:
		return float64(input.(int8))
	case uint8:
		return float64(input.(uint8))
	case int16:
		return float64(input.(int16))
	case uint16:
		return float64(input.(uint16))
	case int32:
		return float64(input.(int32))
	case uint32:
		return float64(input.(uint32))
	case int64:
		return float64(input.(int64))
	case uint64:
		return float64(input.(uint64))
	case float32:
		return float64(input.(float32))
	case float64:
		return input.(float64)
	case string:
		return ParseFloat(input.(string))
	case time.Time:
		return float64(input.(time.Time).UnixMilli())
	case fmt.Stringer:
		return ParseFloat(input.(fmt.Stringer).String())
	case bool:
		return If[float64](input.(bool), 1, 0)
	default:
		value := reflect.ValueOf(input)
		if value.Kind() == reflect.Pointer {
			return Float64ify(value.Elem().Interface())
		}
		return 0
	}
}

func Stringify(input any) string {
	if input == nil {
		return ""
	}
	switch input.(type) {
	case string:
		return input.(string)
	case int:
		return strconv.Itoa(input.(int))
	case uint:
		return strconv.FormatUint(uint64(input.(uint)), 10)
	case int8:
		return strconv.Itoa(int(input.(int8)))
	case uint8:
		return strconv.FormatUint(uint64(input.(uint8)), 10)
	case int16:
		return strconv.Itoa(int(input.(int16)))
	case uint16:
		return strconv.FormatUint(uint64(input.(uint16)), 10)
	case int32:
		return strconv.Itoa(int(input.(int32)))
	case uint32:
		return strconv.FormatUint(uint64(input.(uint32)), 10)
	case int64:
		return strconv.FormatInt(input.(int64), 10)
	case uint64:
		return strconv.FormatUint(input.(uint64), 10)
	case float64:
		return FormatFloat(input.(float64))
	case float32:
		return FormatFloat32(input.(float32))
	case bool:
		return If[string](input.(bool), "true", "false")
	case fmt.Stringer:
		return input.(fmt.Stringer).String()
	default:
		value := reflect.ValueOf(input)
		if value.Kind() == reflect.Pointer {
			return Stringify(value.Elem().Interface())
		}
		return ""
	}
}

func ParseFloat(input string) float64 {
	if len(input) == 0 {
		return 0
	}
	float, _ := strconv.ParseFloat(input, 64)
	return float
}

func ParseFloat32(input string) float32 {
	if len(input) == 0 {
		return 0
	}
	float, _ := strconv.ParseFloat(input, 32)
	return float32(float)
}

func FormatFloat(float float64) string {
	return strconv.FormatFloat(float, 'f', -1, 64)
}

func FormatFloat32(float float32) string {
	return FormatFloat(float64(float))
}

// SplitBytes 把byte切片平均分成count个小切片
func SplitBytes(bts []byte, count int) [][]byte {
	results := make([][]byte, 0, count)
	each := len(bts) / count
	mod := len(bts) % count
	index := 0

	for count > 0 {
		count--
		end := index + each
		// 余数表示多出来的，划分到前mod个切片
		if mod > 0 {
			end++
			mod--
		}
		if end > len(bts) {
			end = len(bts)
		}
		results = append(results, bts[index:end])
		index = end
	}
	return results
}

// Int64Slice 从字符串中提取整数
// 性能是用正则表达式提取的7倍
func Int64Slice(input []rune) []int64 {
	var int64s []int64
	var numPre bool
	var number int64
	var preNotNum rune
	for i, r := range input {
		if r <= '9' && r >= '0' {
			number = number*10 + int64(r-'0')
			if i == len(input)-1 {
				if preNotNum == '-' {
					int64s = append(int64s, -number)
				} else {
					int64s = append(int64s, number)
				}
			}
			numPre = true
		} else {
			if numPre {
				if preNotNum == '-' {
					int64s = append(int64s, -number)
				} else {
					int64s = append(int64s, number)
				}
				number = 0
			}
			numPre = false
			preNotNum = r
		}
	}
	return int64s
}

var dateFieldLens = [9]int{4, 2, 2, 2, 2, 2, 9, 2, 2}

// ParseGeneralDate 解析任意字段有序的日期
// 顺序必须是：年月日时分秒纳秒，兼容ISO8601UTC时区
// 时间字段可以是任意分隔符或填充位数，示例如下：
// 2022年8月21日19点18分38秒123456789纳秒
// 20220821191838.123456789
// 2022-8-21T19:18:38.123456789+8:30
// 2022-8-21 19:18:38Z(可以没有纳秒)
// 2022-8-21(可以没有时间，甚至可以没有日期)
func ParseGeneralDate(input []rune) time.Time {
	dateFields := [9]int{1, 1, 1}
	var fieldNum int
	var fieldLen int
	var zoneRune rune
	var nanoTimes = 1000000000

	// 提取日期字段
	for _, r := range input {
		if r <= '9' && r >= '0' {
			fieldLen++
			if fieldNum == 6 {
				nanoTimes /= 10 // 纳秒是小数形式
			}
			if fieldLen == 1 { // 覆盖字段
				dateFields[fieldNum] = int(r - '0')
			} else if fieldLen == dateFieldLens[fieldNum] { // 字段已满
				dateFields[fieldNum] = dateFields[fieldNum]*10 + int(r-'0')
				if fieldNum > 7 {
					break
				}
				fieldNum++
				fieldLen = 0
			} else { // 追加字段
				dateFields[fieldNum] = dateFields[fieldNum]*10 + int(r-'0')
			}
		} else {
			// 当前字段长度大于0则进入下一个字段
			if fieldLen > 0 {
				if fieldNum > 7 {
					break
				}
				fieldNum++
				fieldLen = 0
			}

			// 处理时区，遵循ISO8601：UTC时区
			if fieldNum > 5 {
				if r == 'Z' { // 结束遍历
					zoneRune = r
					break
				}
				if r == '+' || r == '-' { // 跳转时区字段
					zoneRune = r
					fieldNum = 7
				}
			}
		}
	}

	// 计算时区与偏移
	timeZone := time.Local
	if zoneRune == 'Z' {
		timeZone = time.UTC
	} else if zoneRune == '+' {
		timeZone = time.FixedZone("", dateFields[7]*3600+dateFields[8]*60)
	} else if zoneRune == '-' {
		timeZone = time.FixedZone("", -dateFields[7]*3600-dateFields[8]*60)
	}

	return time.Date(dateFields[0], time.Month(dateFields[1]), dateFields[2],
		dateFields[3], dateFields[4], dateFields[5], dateFields[6]*nanoTimes, timeZone)
}
