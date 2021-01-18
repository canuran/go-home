package strutil

import (
	"reflect"
	"unicode"
	"unsafe"
)

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

func FastString2Bytes(b []byte) (s string) {
	// SliceHeader 和 StringHeader 只是用来对应 []byte 和 string 的内存分布
	bytesPtr := (*reflect.SliceHeader)(unsafe.Pointer(&b))
	stringPtr := (*reflect.StringHeader)(unsafe.Pointer(&s))
	stringPtr.Data = bytesPtr.Data
	stringPtr.Len = bytesPtr.Len
	return
}

func FastBytes2String(s string) (b []byte) {
	bytesPtr := (*reflect.SliceHeader)(unsafe.Pointer(&b))
	stringPtr := (*reflect.StringHeader)(unsafe.Pointer(&s))
	bytesPtr.Data = stringPtr.Data
	bytesPtr.Len = stringPtr.Len
	bytesPtr.Cap = stringPtr.Len
	return
}