package util

import (
	"github.com/nfnt/resize"
	"image"
	"image/gif"
	"image/jpeg"
	"image/png"
	"io"
	"strings"
)

type ResizeOption struct {
	Reader  io.Reader
	Width   uint // 可选
	Height  uint // 可选
	Writer  io.Writer
	InName  string // 默认jpg
	OutName string // 默认jpg
}

func ImageResize(option *ResizeOption) error {
	if option == nil {
		return nil
	}
	inName := strings.ToLower(option.InName)
	var img image.Image
	var err error
	switch {
	case strings.HasSuffix(inName, "jpg"),
		strings.HasSuffix(inName, "jpeg"):
		img, err = jpeg.Decode(option.Reader)
	case strings.HasSuffix(inName, "png"):
		img, err = png.Decode(option.Reader)
	case strings.HasSuffix(inName, "gif"):
		img, err = gif.Decode(option.Reader)
	default:
		img, err = jpeg.Decode(option.Reader)
	}
	if err != nil {
		return err
	}

	// resize and preserve aspect ratio
	m := resize.Resize(option.Width, option.Height, img, resize.Lanczos3)

	outName := strings.ToLower(option.OutName)
	switch {
	case strings.HasSuffix(outName, "jpg"),
		strings.HasSuffix(outName, "jpeg"):
		err = jpeg.Encode(option.Writer, m, nil)
	case strings.HasSuffix(outName, "png"):
		err = png.Encode(option.Writer, m)
	case strings.HasSuffix(outName, "gif"):
		err = gif.Encode(option.Writer, m, nil)
	default:
		img, err = jpeg.Decode(option.Reader)
	}
	return err
}
