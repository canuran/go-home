package util

import (
	"fmt"
	"strconv"
	"time"
)

func Int64ify(input interface{}) int64 {
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
	case bool:
		if input.(bool) {
			return 1
		} else {
			return 0
		}
	case time.Time:
		return input.(time.Time).Unix()
	default:
		value, ok := input.(string)
		if !ok {
			value = fmt.Sprint(input)
		}
		float, _ := strconv.ParseFloat(value, 64)
		return int64(float)
	}
}

func Float64ify(input interface{}) float64 {
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
	case bool:
		if input.(bool) {
			return 1
		} else {
			return 0
		}
	case time.Time:
		return float64(input.(time.Time).Unix())
	default:
		value, ok := input.(string)
		if !ok {
			value = fmt.Sprint(input)
		}
		float, _ := strconv.ParseFloat(value, 64)
		return float
	}
}

func Stringify(input interface{}) string {
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
		if input.(bool) {
			return "true"
		} else {
			return "false"
		}
	case time.Time:
		return input.(time.Time).String()
	default:
		return fmt.Sprint(input)
	}
}

func FormatFloat(float float64) string {
	return strconv.FormatFloat(float, 'f', -1, 64)
}

func FormatFloat32(float float32) string {
	return FormatFloat(float64(float))
}