package util

import (
	"os"
	"testing"
)

func TestImageResize(t *testing.T) {
	file, err := os.Open("/Users/admin/Downloads/3.jpg")
	TestingErr(t, err)

	file2, err := os.Create("/Users/admin/Downloads/res.jpg")
	TestingErr(t, err)

	err = ImageResize(&ResizeOption{
		Reader:        file,
		Width:         100,
		Height:        100,
		Writer:        file2,
		OutFormat:     "jpg",
		MaxJpgOutByte: 2000,
	})
	TestingErr(t, err)
}
