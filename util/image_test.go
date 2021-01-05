package util

import (
	"os"
	"testing"
)

func TestImageResize(t *testing.T) {
	file, err := os.Open("/Users/admin/Downloads/1.jpg")
	TestingErr(t, err)

	file2, err := os.Create("/Users/admin/Downloads/res.jpg")
	TestingErr(t, err)

	err = ConvertImage(&ConvertOption{
		Reader:        file,
		Writer:        file2,
		OutFormat:     "jpg",
		MaxJpgQuality: 20,
	})
	TestingErr(t, err)
}
