package util

import (
	"bytes"
	"encoding/base64"
	"io"
)

func Base64Encode(data []byte) []byte {
	var out bytes.Buffer
	encoder := base64.NewEncoder(base64.StdEncoding, &out)
	_, _ = encoder.Write(data)
	Close(encoder)
	return out.Bytes()
}

func Base64Decode(data []byte) []byte {
	var in bytes.Buffer
	var out bytes.Buffer
	in.Write(data)
	decoder := base64.NewDecoder(base64.StdEncoding, &in)
	_, _ = io.Copy(&out, decoder)
	return out.Bytes()
}
