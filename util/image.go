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
	Width         int // 宽高可以二选一
	Height        int // 宽高可以二选一
	Writer        io.Writer
	OutFormat     string // 输出格式默认jpg
	MaxJpgOutByte int    // jpg最大输出文件大小
	MaxJpgQuality int    // jpg最大输出质量默认80
}

func ImageResize(option *ResizeOption) error {
	if option == nil {
		return nil
	}

	img, _, err := image.Decode(option.Reader)
	if err != nil {
		return err
	}

	imgNRGBA := imaging.Resize(img, option.Width, option.Height, imaging.Lanczos)

	err = writeImage(imgNRGBA, option)
	return err
}

func writeImage(img *image.NRGBA, option *ResizeOption) error {
	outFormat := strings.ToLower(strings.TrimSpace(option.OutFormat))
	switch {
	case strings.HasSuffix(outFormat, "png"):
		return png.Encode(option.Writer, img)

	case strings.HasSuffix(outFormat, "gif"):
		return gif.Encode(option.Writer, img, nil)

	case outFormat == "", // 默认jpg
		strings.HasSuffix(outFormat, "jpg"),
		strings.HasSuffix(outFormat, "jpeg"):
		maxQuality := option.MaxJpgQuality
		if maxQuality < 1 { // 默认80
			maxQuality = 80
		}

		if option.MaxJpgOutByte > 0 {
			for quality := maxQuality; quality > 0; quality-- {
				var out bytes.Buffer
				err := jpeg.Encode(&out, img, &jpeg.Options{Quality: quality})
				if err != nil {
					return err
				}
				if out.Len() <= option.MaxJpgOutByte {
					_, err := option.Writer.Write(out.Bytes())
					return err
				}
			}
			return fmt.Errorf("final image large than %d", option.MaxJpgOutByte)

		} else {
			return jpeg.Encode(option.Writer, img, &jpeg.Options{Quality: maxQuality})
		}

	default:
		return fmt.Errorf("unsupported out format %s", outFormat)
	}
}
