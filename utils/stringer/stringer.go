package stringer

import (
	"strings"
	"unicode"
	"unsafe"
)

// AllSpaceRune 是否包含非空字符
func AllSpaceRune(runes []rune) bool {
	for _, r := range runes {
		if !unicode.IsSpace(r) {
			return false
		}
	}
	return true
}

// AllSpaceString 是否包含非空字符
func AllSpaceString(input string) bool {
	return AllSpaceRune([]rune(input))
}

// AllSpacePtrString 是否包含文本字符
func AllSpacePtrString(value *string) bool {
	if value == nil {
		return false
	}
	return AllSpaceRune([]rune(*value))
}

func FormatSpaceString(input string) string {
	return string(FormatSpaceRunes([]rune(input)))
}

func StringToBytes(s string) []byte {
	return unsafe.Slice(unsafe.StringData(s), len(s))
}

func BytesToString(b []byte) string {
	return unsafe.String(&b[0], len(b))
}

// FormatSpaceRunes 格式化空字符
// 去掉开头和结尾的空白字符
// 单个或多个空白字符以单个空格代替
func FormatSpaceRunes(runes []rune) []rune {
	preSpace := true
	result := make([]rune, 0, len(runes))
	for _, r := range runes {
		if unicode.IsSpace(r) {
			if !preSpace {
				result = append(result, ' ')
				preSpace = true
			}
		} else if unicode.IsGraphic(r) {
			result = append(result, r)
			preSpace = false
		} else {
			if !preSpace {
				result = append(result, ' ')
				preSpace = true
			}
		}
	}
	if len(result) > 1 && result[len(result)-1] == ' ' {
		result = result[:len(result)-1]
	}
	return result
}

// RemoveAllSpace 移除所有空白字符
func RemoveAllSpace(input []rune) string {
	newRunes := make([]rune, 0, len(input))
	for _, r := range input {
		if !unicode.IsSpace(r) {
			newRunes = append(newRunes, r)
		}
	}
	return string(newRunes)
}

// AllDigits 是否都是数字
func AllDigits(runes []rune) bool {
	for _, r := range runes {
		if !unicode.IsDigit(r) {
			return false
		}
	}
	return true
}

func EscapeSqlLike(value string) string {
	value = strings.ReplaceAll(value, `\`, `\\`)
	value = strings.ReplaceAll(value, `%`, `\%`)
	return strings.ReplaceAll(value, `_`, `\_`)
}
