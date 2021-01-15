package compress

import (
	"bytes"
	"compress/gzip"
	"io"
)

func GZipBytes(data []byte) []byte {
	var input bytes.Buffer
	writer := gzip.NewWriter(&input)
	_, _ = writer.Write(data)
	_ = writer.Close()
	return input.Bytes()
}

func UnGZipBytes(data []byte) []byte {
	var out bytes.Buffer
	var in bytes.Buffer
	in.Write(data)
	reader, _ := gzip.NewReader(&in)
	_ = reader.Close()
	_, _ = io.Copy(&out, reader)
	return out.Bytes()
}
