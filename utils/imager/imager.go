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
	JpgMaxSize    int       // jpg最大输出文件大小
	JpgMaxQuality int       // jpg最大输出质量默认100
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
		return encodeJpgImage(img, option)
	default:
		return fmt.Errorf("unsupported out format %s", outFormat)
	}
}

func encodeJpgImage(img image.Image, option *ConvertOption) error {
	maxQuality := option.JpgMaxQuality
	if maxQuality < 1 {
		maxQuality = 100
	}
	if option.JpgMaxSize > 0 {
		var buffer bytes.Buffer
		err := jpeg.Encode(&buffer, img, &jpeg.Options{Quality: maxQuality})
		if err != nil {
			return err
		}
		if buffer.Len() <= option.JpgMaxSize {
			_, err = option.Writer.Write(buffer.Bytes())
			return err
		}
		if maxQuality < 2 {
			return fmt.Errorf("final image size %d large than %d", buffer.Len(), option.JpgMaxSize)
		}
		return encodeJpgImage(img, &ConvertOption{
			JpgMaxQuality: maxQuality * 3 / 4,
			JpgMaxSize:    option.JpgMaxSize,
			Writer:        option.Writer})
	} else {
		return jpeg.Encode(option.Writer, img, &jpeg.Options{Quality: maxQuality})
	}
}
