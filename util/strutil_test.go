package util

import (
	"fmt"
	"testing"
)

func TestFixName(t *testing.T) {
	fmt.Println(len(FilterName([]rune(" \xEF\xBB\xBF  \n\t\r\n  "))))
	fmt.Println(string(FilterName([]rune(" 好 \n\t\r 好的 1@　#er ☁ ☯ ☸...  "))))
}