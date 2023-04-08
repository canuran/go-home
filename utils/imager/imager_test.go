package imager

import (
	"bytes"
	"fmt"
	"github.com/stretchr/testify/assert"
	"os"
	"testing"
)

func TestConvertImage(t *testing.T) {
	fileBts, err := os.ReadFile("test.jpeg")
	assert.Nil(t, err)
	for i := 10; i < 40; i++ {
		var reader bytes.Buffer
		reader.Write(fileBts)
		var buffer bytes.Buffer
		option := &ConvertOption{
			Reader:     &reader,
			Writer:     &buffer,
			NewHeight:  200,
			NewWidth:   200,
			OutFormat:  "jpg",
			JpgMaxSize: i * 100,
		}
		err = ConvertImage(option)
		if err != nil {
			fmt.Println("目标", option.JpgMaxSize, "结果", err.Error())
		} else {
			fmt.Println("目标", option.JpgMaxSize, "结果", buffer.Len())
		}
	}
}
