package imager

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

type ConvertOption struct {
	Reader        io.Reader // 输入流
	NewWidth      int       // 调整大小参数可选
	NewHeight     int       // 调整大小参数可选
	Writer        io.Writer // 输出流
	OutFormat     string    // 输出格式默认jpg
	JpgMaxSize    int       // jpg最大字节限制
	JpgMaxQuality int       // jpg最大输出质量
}

func ConvertImage(option *ConvertOption) error {
	if option == nil || option.Reader == nil || option.Writer == nil {
		return nil
	}

	img, _, err := image.Decode(option.Reader)
	if err != nil {
		return err
	}

	outImage := img
	if option.NewWidth > 0 || option.NewHeight > 0 {
		outImage = imaging.Resize(img, option.NewWidth, option.NewHeight, imaging.Lanczos)
	}

	err = writeImage(outImage, option)
	return err
}

func writeImage(img image.Image, option *ConvertOption) error {
	outFormat := strings.ToLower(strings.TrimSpace(option.OutFormat))
	switch {
	case strings.HasSuffix(outFormat, "png"):
		return png.Encode(option.Writer, img)

	case strings.HasSuffix(outFormat, "gif"):
		return gif.Encode(option.Writer, img, nil)

	case outFormat == "", // 默认jpg
		strings.HasSuffix(outFormat, "jpg"),
		strings.HasSuffix(outFormat, "jpeg"):
		if option.JpgMaxQuality < 1 {
			option.JpgMaxQuality = jpeg.DefaultQuality
		} else if option.JpgMaxQuality > 100 {
			option.JpgMaxQuality = 100
		}
		if option.JpgMaxSize > 0 {
			return encodeJpegImage(img, option.Writer, 1, option.JpgMaxQuality, option.JpgMaxSize)
		}
		return jpeg.Encode(option.Writer, img, &jpeg.Options{Quality: option.JpgMaxQuality})
	default:
		return fmt.Errorf("unsupported out format %s", outFormat)
	}
}

func encodeJpegImage(img image.Image, writer io.Writer, minQuality, maxQuality, maxSize int) error {
	quality := (minQuality + maxQuality) / 2
	var buffer bytes.Buffer
	err := jpeg.Encode(&buffer, img, &jpeg.Options{Quality: quality})
	if err != nil {
		return err
	}
	if buffer.Len() > maxSize {
		if quality > (minQuality+quality)/2 {
			// 还可以更小
			return encodeJpegImage(img, writer, minQuality, quality, maxSize)
		}
	} else {
		if quality < (maxQuality+quality)/2 {
			// 还可以更大
			return encodeJpegImage(img, writer, quality, maxQuality, maxSize)
		}
		_, err = writer.Write(buffer.Bytes())
		return err
	}
	return fmt.Errorf("minimum size %d large than %d", buffer.Len(), maxSize)
}
