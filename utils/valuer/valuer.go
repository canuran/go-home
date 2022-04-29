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

func Elem[T any](value *T) T {
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
	case fmt.Stringer:
		return int64(ParseFloat(input.(fmt.Stringer).String()))
	case time.Time:
		return input.(time.Time).UnixMilli()
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
	case time.Time:
		return float64(input.(time.Time).UnixMilli())
	case string:
		return ParseFloat(input.(string))
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
func Int64Slice(input []rune) []int64 {
	var res []int64
	var numPre bool
	var number int64
	var negative bool
	maxIndex := len(input) - 1
	for i, r := range input {
		if r <= '9' && r >= '0' {
			number = number*10 + int64(r-'0')
			if i == maxIndex {
				if negative {
					res = append(res, -number)
				} else {
					res = append(res, number)
				}
				negative = false
			}
			numPre = true
		} else {
			if numPre {
				if negative {
					res = append(res, -number)
				} else {
					res = append(res, number)
				}
				number = 0
			}
			numPre = false
			if r == '-' {
				negative = true
			} else {
				negative = false
			}
		}
	}
	return res
}
