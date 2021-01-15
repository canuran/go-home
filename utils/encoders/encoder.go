package encoders

import (
	"bytes"
	"crypto/md5"
	"encoding/base64"
	"encoding/hex"
	"io"
)

func Md5(input []byte) []byte {
	bts := md5.Sum(input)
	return bts[:]
}

func Md5String(input []byte) string {
	return hex.EncodeToString(Md5(input))
}

func Base64EncodeString(data []byte) string {
	return string(Base64Encode(data))
}

func Base64Encode(data []byte) []byte {
	var out bytes.Buffer
	encoder := base64.NewEncoder(base64.StdEncoding, &out)
	_, _ = encoder.Write(data)
	_ = encoder.Close()
	return out.Bytes()
}

func Base64DecodeString(data string) []byte {
	return Base64Decode([]byte(data))
}

func Base64Decode(data []byte) []byte {
	var in bytes.Buffer
	var out bytes.Buffer
	in.Write(data)
	decoder := base64.NewDecoder(base64.StdEncoding, &in)
	_, _ = io.Copy(&out, decoder)
	return out.Bytes()
}
