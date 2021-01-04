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
		Reader:  file,
		Width:   100,
		Height:  100,
		Writer:  file2,
		InName:  "1.jpg",
		OutName: "jpg",
		MaxJpgByte: 1000,
	})
	TestingErr(t, err)
}
