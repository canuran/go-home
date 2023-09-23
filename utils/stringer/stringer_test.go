package stringer

import (
	"fmt"
	"testing"
)

func TestFormatSpaceRunes(t *testing.T) {
	fmt.Println(len(FormatSpaceRunes([]rune(" \xEF\xBB\xBF  \n\t\r\n  "))))
	fmt.Println(string(FormatSpaceRunes([]rune(" 好 \n\t\r 好的 1@　#er ☁ ☯ ☸...  "))))
}

func TestString2Bytes(t *testing.T) {
	str := "小乔要努力变强123"
	fmt.Println(str)

	bts := StringToBytes(str)
	fmt.Println(string(bts))

	fmt.Println(BytesToString(bts))
}
