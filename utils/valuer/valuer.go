package valuer

import (
	"fmt"
	"reflect"
	"strconv"
	"time"
)

func Ptr[T any](value T) *T {
	return &value
}

func If[T any](test bool, ok, no T) T {
	if test {
		return ok
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
	if val, ok := input.(int64); ok {
		return val
	} else if val, ok := input.(float64); ok {
		return int64(val)
	} else if val, ok := input.(string); ok {
		return int64(ParseFloat(val))
	} else if val, ok := input.(fmt.Stringer); ok {
		return int64(ParseFloat(val.String()))
	}
	value := reflect.ValueOf(input)
	if value.Kind() == reflect.Pointer {
		return Int64ify(value.Elem().Interface())
	} else if value.CanInt() {
		return value.Int()
	} else if value.CanUint() {
		return int64(value.Uint())
	} else if value.CanFloat() {
		return int64(value.Float())
	}
	return ParseInt(fmt.Sprint(input))
}

func Float64ify(input any) float64 {
	if input == nil {
		return 0
	}
	if val, ok := input.(int64); ok {
		return float64(val)
	} else if val, ok := input.(float64); ok {
		return val
	} else if val, ok := input.(string); ok {
		return ParseFloat(val)
	} else if val, ok := input.(fmt.Stringer); ok {
		return ParseFloat(val.String())
	}
	value := reflect.ValueOf(input)
	if value.Kind() == reflect.Pointer {
		return Float64ify(value.Elem().Interface())
	} else if value.CanInt() {
		return float64(value.Int())
	} else if value.CanUint() {
		return float64(value.Uint())
	} else if value.CanFloat() {
		return value.Float()
	}
	return ParseFloat(fmt.Sprint(input))
}

func Stringify(input any) string {
	if input == nil {
		return ""
	}
	if val, ok := input.(int64); ok {
		return strconv.FormatInt(val, 10)
	} else if val, ok := input.(float64); ok {
		return FormatFloat(val)
	} else if val, ok := input.(string); ok {
		return val
	} else if val, ok := input.(fmt.Stringer); ok {
		return val.String()
	}
	value := reflect.ValueOf(input)
	if value.Kind() == reflect.Pointer {
		return Stringify(value.Elem().Interface())
	} else if value.CanInt() {
		return strconv.FormatInt(value.Int(), 10)
	} else if value.CanUint() {
		return strconv.FormatInt(int64(value.Uint()), 10)
	} else if value.CanFloat() {
		return FormatFloat(value.Float())
	}
	return fmt.Sprint(input)
}

func ParseInt(input string) int64 {
	if len(input) == 0 {
		return 0
	}
	integer, _ := strconv.ParseInt(input, 10, 64)
	return integer
}

func ParseFloat(input string) float64 {
	if len(input) == 0 {
		return 0
	}
	float, _ := strconv.ParseFloat(input, 64)
	return float
}

func FormatFloat(float float64) string {
	return strconv.FormatFloat(float, 'f', -1, 64)
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
