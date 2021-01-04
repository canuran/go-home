package util

import (
	"bytes"
	"fmt"
	"image"
	"image/gif"
	"image/jpeg"
	"image/png"
	"io"
	"strings"

	"github.com/disintegration/imaging"
)

type ResizeOption struct {
	Reader        io.Reader
	Width         int // 可选
	Height        int // 可选
	Writer        io.Writer
	InName        string // 默认jpg
	OutName       string // 默认jpg
	MaxOutJpgByte int    // jpg输出文件大小限制
}

func ImageResize(option *ResizeOption) error {
	if option == nil {
		return nil
	}
	img, err := readImage(option.Reader, option.InName)
	if err != nil {
		return err
	}

	m := imaging.Resize(img, option.Width, option.Height, imaging.Lanczos)

	err = writeImage(option.Writer, m, option.OutName, option.MaxOutJpgByte)
	return err
}

func writeImage(writer io.Writer, img *image.NRGBA, outName string, maxJpgByte int) error {
	outName = strings.ToLower(outName)
	switch {
	case strings.HasSuffix(outName, "png"):
		return png.Encode(writer, img)
	case strings.HasSuffix(outName, "gif"):
		return gif.Encode(writer, img, nil)
	case strings.HasSuffix(outName, "jpg"),
		strings.HasSuffix(outName, "jpeg"):
		fallthrough
	default:
		if maxJpgByte > 0 {
			for quality := 90; quality > 0; quality -= 1 {
				var out bytes.Buffer
				err := jpeg.Encode(&out, img, &jpeg.Options{Quality: quality})
				if err != nil {
					return err
				}
				if out.Len() <= maxJpgByte {
					_, err := writer.Write(out.Bytes())
					return err
				}
			}
			return fmt.Errorf("output image large than %d", maxJpgByte)
		} else {
			return jpeg.Encode(writer, img, &jpeg.Options{Quality: 90})
		}
	}
}

func readImage(reader io.Reader, inName string) (image.Image, error) {
	inName = strings.ToLower(inName)
	var img image.Image
	var err error
	switch {
	case strings.HasSuffix(inName, "jpg"),
		strings.HasSuffix(inName, "jpeg"):
		img, err = jpeg.Decode(reader)
	case strings.HasSuffix(inName, "png"):
		img, err = png.Decode(reader)
	case strings.HasSuffix(inName, "gif"):
		img, err = gif.Decode(reader)
	default:
		img, err = jpeg.Decode(reader)
	}
	return img, err
}
