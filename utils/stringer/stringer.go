package stringer

import (
	"reflect"
	"unicode"
	"unsafe"
)

// 是否包含文本字符
func HasText(value string) bool {
	return HasTextRunes([]rune(value))
}

// 是否包含文本字符
func HasTextPtr(value *string) bool {
	if value == nil {
		return false
	}
	return HasTextRunes([]rune(*value))
}

// 是否包含文本字符
func HasTextRunes(runes []rune) bool {
	for _, r := range runes {
		if !unicode.IsSpace(r) {
			return true
		}
	}
	return false
}

// 去掉所有不可见字符
// 去掉开头和结尾的空白字符
// 单个或多个空白字符以单个空格代替
func StandardizeRunes(input []rune) []rune {
	preSpace := true
	runes := make([]rune, 0, len(input))
	for _, r := range input {
		if unicode.IsSpace(r) {
			if !preSpace {
				runes = append(runes, ' ')
				preSpace = true
			}
		} else if unicode.IsGraphic(r) {
			runes = append(runes, r)
			preSpace = false
		} else {
			if !preSpace {
				runes = append(runes, ' ')
				preSpace = true
			}
		}
	}
	runesLen := len(runes)
	if runesLen > 1 && runes[runesLen-1] == ' ' {
		runes = runes[:runesLen-1]
	}
	return runes
}

func StandardizeString(input string) string {
	return string(StandardizeRunes([]rune(input)))
}

// 最小编辑距离
func MinEditDistance(str1, str2 []rune) int {
	s1len := len(str1)
	s2len := len(str2)
	column := make([]int, len(str1)+1)
	for y := 1; y <= s1len; y++ {
		column[y] = y
	}
	for x := 1; x <= s2len; x++ {
		column[0] = x
		lastKey := x - 1
		for y := 1; y <= s1len; y++ {
			oldKey := column[y]
			var incr int
			if str1[y-1] != str2[x-1] {
				incr = 1
			}
			column[y] = minimum(column[y]+1, column[y-1]+1, lastKey+incr)
			lastKey = oldKey
		}
	}
	return column[s1len]
}

func minimum(a, b, c int) int {
	if a < b {
		if a < c {
			return a
		}
	} else {
		if b < c {
			return b
		}
	}
	return c
}

func FastBytes2String(b []byte) (s string) {
	// SliceHeader 和 StringHeader 只是用来对应 []byte 和 string 的内存分布
	bytesPtr := (*reflect.SliceHeader)(unsafe.Pointer(&b))
	stringPtr := (*reflect.StringHeader)(unsafe.Pointer(&s))
	stringPtr.Data = bytesPtr.Data
	stringPtr.Len = bytesPtr.Len
	return
}

func FastString2Bytes(s string) (b []byte) {
	bytesPtr := (*reflect.SliceHeader)(unsafe.Pointer(&b))
	stringPtr := (*reflect.StringHeader)(unsafe.Pointer(&s))
	bytesPtr.Data = stringPtr.Data
	bytesPtr.Len = stringPtr.Len
	bytesPtr.Cap = stringPtr.Len
	return
}

// 移除空白字符，即使是中文全角空格
func RemoveAllSpace(input []rune) string {
	newRunes := make([]rune, 0, len(input))
	for _, r := range input {
		if !unicode.IsSpace(r) {
			newRunes = append(newRunes, r)
		}
	}
	return string(newRunes)
}

// 安全子字符串
func SubstringSafely(input string, from int, to int) string {
	runes := []rune(input)
	length := len(runes)
	if length == 0 {
		return ""
	}

	if from < 0 {
		from = 0
	} else if from >= length {
		return ""
	}

	if to < 0 {
		return ""
	} else if to >= length {
		to = length
	}

	return string(runes[from:to])
}

// 是否整数或小数
func IsNumber(s []rune) bool {
	preNum := false
	dotFound := false
	maxIndex := len(s) - 1
	for i, v := range s {
		if v == '-' { // 负号
			if i > 0 || i == maxIndex {
				return false
			}
			continue
		}
		if v == '.' { // 浮点
			if dotFound || !preNum {
				return false
			}
			if i == 0 || i == maxIndex {
				return false
			}
			dotFound = true
			continue
		}
		if v < '0' || v > '9' { // 数字
			return false
		} else {
			preNum = true
		}
	}
	return true
}