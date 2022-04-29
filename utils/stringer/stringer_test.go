package stringer

import (
	"fmt"
	"testing"
)

func TestStandardizeRunes(t *testing.T) {
	fmt.Println(len(FormatSpaceRunes([]rune(" \xEF\xBB\xBF  \n\t\r\n  "))))
	fmt.Println(string(FormatSpaceRunes([]rune(" 好 \n\t\r 好的 1@　#er ☁ ☯ ☸...  "))))
}

func TestFastString2Bytes(t *testing.T) {
	str := "小乔要努力变强123"
	fmt.Println(str)

	bts := FastString2Bytes(str)
	fmt.Println(string(bts))

	fmt.Println(FastBytes2String(bts))
}
