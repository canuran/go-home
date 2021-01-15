package common

import (
	"fmt"
	"github.com/ewingtsai/go-web/utils/encoders"
	"testing"
)

func TestLogIfErr(t *testing.T) {
	LogIfErr(fmt.Errorf("hello"))
}

func TestStringMd5(t *testing.T) {
	fmt.Println(UserDefaultHeader)
	fmt.Println(encoders.Md5String([]byte("")))
	fmt.Println(encoders.Md5String([]byte("ybybybyb")))
}