package util

import "unicode"

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
		}
	}
	runesLen := len(runes)
	if runesLen > 1 && runes[runesLen-1] == ' ' {
		runes = runes[:runesLen-2]
	}
	return runes
}
