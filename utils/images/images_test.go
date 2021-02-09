package images

import (
	"bytes"
	"fmt"
	"github.com/ewingtsai/go-web/tools/errer"
	"io/ioutil"
	"testing"
)

func TestImageResize(t *testing.T) {
	fileBts, err := ioutil.ReadFile("test.jpg")
	if errer.LogIfErr(err) {
		return
	}
	for i := 80; i < 120; i++ {
		var reader bytes.Buffer
		reader.Write(fileBts)
		var buffer bytes.Buffer
		option := &ConvertOption{
			Reader:        &reader,
			Writer:        &buffer,
			NewHeight:     100,
			NewWidth:      100,
			OutFormat:     "jpg",
			MaxJpgOutByte: i * 10,
		}
		err = ConvertImage(option)
		if err != nil {
			fmt.Println(option.MaxJpgOutByte, ">", err.Error())
		} else {
			fmt.Println(option.MaxJpgOutByte, ">", buffer.Len())
		}
	}
}
