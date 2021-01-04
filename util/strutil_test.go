package util

import (
	"fmt"
	"testing"
)

func TestFixName(t *testing.T) {
	fmt.Println(len(StandardizeRunes([]rune(" \xEF\xBB\xBF  \n\t\r\n  "))))
	fmt.Println(string(StandardizeRunes([]rune(" 好 \n\t\r 好的 1@　#er ☁ ☯ ☸...  "))))
}