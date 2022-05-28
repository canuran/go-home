package errutil

import (
	"fmt"
	"github.com/ewingtsai/go-home/utils/codec"
	"testing"
)

func TestLogIfErr(t *testing.T) {
	LogIfErr(fmt.Errorf("hello1"))
	LogIfErr(fmt.Errorf("hello2"))
	LogIfErr(fmt.Errorf("hello3"))
}

func TestStringMd5(t *testing.T) {
	fmt.Println(codec.Md5String([]byte("")))
	fmt.Println(codec.Md5String([]byte("1233")))
}
