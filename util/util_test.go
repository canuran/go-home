package util

import (
	"fmt"
	"testing"
)

func TestLogIfErr(t *testing.T) {
	LogIfErr(fmt.Errorf("hello"))
}

func TestStringMd5(t *testing.T) {
	fmt.Println(StringMd5(""))
	fmt.Println(StringMd5("ybybybyb"))
}