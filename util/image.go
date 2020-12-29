package util

import (
	"image"
	"image/gif"
	"image/jpeg"
	"image/png"
	"io"
	"strings"

	"github.com/disintegration/imaging"
)

type ResizeOption struct {
	Reader  io.Reader
	Width   int // 可选
	Height  int // 可选
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

	m := imaging.Resize(img, option.Width, option.Height, imaging.Lanczos)

	outName := strings.ToLower(option.OutName)
	switch {
	case strings.HasSuffix(outName, "jpg"),
		strings.HasSuffix(outName, "jpeg"):
		err = jpeg.Encode(option.Writer, m, &jpeg.Options{Quality: 90})
	case strings.HasSuffix(outName, "png"):
		err = png.Encode(option.Writer, m)
	case strings.HasSuffix(outName, "gif"):
		err = gif.Encode(option.Writer, m, nil)
	default:
		err = jpeg.Encode(option.Writer, m, &jpeg.Options{Quality: 90})
	}
	return err
}
