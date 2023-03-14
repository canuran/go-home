package codec

import (
	"fmt"
	"github.com/stretchr/testify/assert"
	"os"
	"testing"
)

func TestAscii85(t *testing.T) {
	readFile, err := os.ReadFile("base.go")
	assert.Nil(t, err)
	fmt.Println("origin size", len(readFile))

	encode := Ascii85Encode(readFile)
	fmt.Println("encode size", len(encode))

	decode := Ascii85Decode(encode)
	fmt.Println("decode size", len(decode))

	fmt.Println("encode content:")
	fmt.Println(string(encode))

	fmt.Println("decode content:")
	fmt.Println(string(decode))
}

func TestBase64(t *testing.T) {
	readFile, err := os.ReadFile("base.go")
	assert.Nil(t, err)
	fmt.Println("origin size", len(readFile))

	encode := Base64Encode(readFile)
	fmt.Println("encode size", len(encode))

	decode := Base64Decode(encode)
	fmt.Println("decode size", len(decode))

	fmt.Println("encode content:")
	fmt.Println(string(encode))

	fmt.Println("decode content:")
	fmt.Println(string(decode))
}

func BenchmarkAscii85(b *testing.B) {
	readFile, err := os.ReadFile("base.go")
	assert.Nil(b, err)
	for i := 0; i < b.N; i++ {
		encode := Ascii85Encode(readFile)
		decode := Ascii85Decode(encode)
		_ = len(decode)
	}
}

func BenchmarkBase64(b *testing.B) {
	readFile, err := os.ReadFile("base.go")
	assert.Nil(b, err)
	for i := 0; i < b.N; i++ {
		encode := Base64Encode(readFile)
		decode := Base64Decode(encode)
		_ = len(decode)
	}
}
