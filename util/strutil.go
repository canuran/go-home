package util

import "unicode"

// 去掉所有不可见字符
// 去掉开头和结尾的空白字符
// 单个或多个空白字符以单个空格代替
func FilterName(names []rune) []rune {
	preSpace := true
	runes := make([]rune, 0, len(names))
	for _, r := range names {
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
		runes = runes[:runesLen-2]
	}
	return runes
}
