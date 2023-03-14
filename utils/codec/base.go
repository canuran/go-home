package codec

import (
	"encoding/ascii85"
	"encoding/base64"
)

func Base64EncodeString(data []byte) string {
	return string(Base64Encode(data))
}

func Base64Encode(data []byte) []byte {
	out := make([]byte, base64.StdEncoding.EncodedLen(len(data)))
	base64.StdEncoding.Encode(out, data)
	return out
}

func Base64DecodeString(data string) []byte {
	return Base64Decode([]byte(data))
}

func Base64Decode(data []byte) []byte {
	out := make([]byte, base64.StdEncoding.DecodedLen(len(data)))
	decode, _ := base64.StdEncoding.Decode(out, data)
	return out[:decode]
}

func Ascii85Encode(data []byte) []byte {
	out := make([]byte, ascii85.MaxEncodedLen(len(data)))
	encode := ascii85.Encode(out, data)
	return out[:encode]
}

func Ascii85Decode(data []byte) []byte {
	out := make([]byte, len(data)*5/4)
	ndst, _, _ := ascii85.Decode(out, data, true)
	return out[:ndst]
}
