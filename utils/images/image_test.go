package images

import (
	"github.com/ewingtsai/go-web/common"
	"os"
	"testing"
)

func TestImageResize(t *testing.T) {
	file, err := os.Open("/Users/admin/Downloads/1.jpg")
	if common.LogIfErr(err) {
		return
	}

	file2, err := os.Create("/Users/admin/Downloads/res.jpg")
	if common.LogIfErr(err) {
		return
	}

	err = ConvertImage(&ConvertOption{
		Reader:        file,
		Writer:        file2,
		OutFormat:     "jpg",
		MaxJpgQuality: 20,
	})
	common.TestingErr(t, err)
}
