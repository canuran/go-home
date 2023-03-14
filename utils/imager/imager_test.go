package imager

import (
	"bytes"
	"fmt"
	"github.com/stretchr/testify/assert"
	"os"
	"testing"
)

func TestImageResize(t *testing.T) {
	fileBts, err := os.ReadFile("test.jpg")
	if !assert.Nil(t, err) {
		return
	}
	for i := 80; i < 120; i++ {
		var reader bytes.Buffer
		reader.Write(fileBts)
		var buffer bytes.Buffer
		option := &ConvertOption{
			Reader:     &reader,
			Writer:     &buffer,
			NewHeight:  128,
			NewWidth:   128,
			OutFormat:  "jpg",
			JpgMaxSize: i * 10,
		}
		err = ConvertImage(option)
		if err != nil {
			fmt.Println("目标", option.JpgMaxSize, "结果", err.Error())
		} else {
			fmt.Println("目标", option.JpgMaxSize, "结果", buffer.Len())
		}
	}
}
