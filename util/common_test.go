package util

import (
	"fmt"
	"testing"
)

func TestLogIfErr(t *testing.T) {
	LogIfErr(fmt.Errorf("hello"))
}

func TestStringMd5(t *testing.T) {
	fmt.Println(Md5String([]byte("")))
	fmt.Println(Md5String([]byte("ybybybyb")))
}