package util

import (
	"fmt"
	"testing"

	"github.com/ewingtsai/go-web/common"
)

func TestLogIfErr(t *testing.T) {
	LogIfErr(fmt.Errorf("hello"))
}

func TestStringMd5(t *testing.T) {
	fmt.Println(common.UserDefaultHeader)
	fmt.Println(Md5String([]byte("")))
	fmt.Println(Md5String([]byte("ybybybyb")))
}