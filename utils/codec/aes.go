package codec

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"fmt"
)

func AesEncrypt(origData, key []byte) (bts []byte, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("%v", r)
		}
	}()
	block, err := aes.NewCipher(key)
	if err != nil {
		return
	}

	blockSize := block.BlockSize()
	origData = PKCS5Padding(origData, blockSize)
	blockMode := cipher.NewCBCEncrypter(block, key[:blockSize])
	encrypted := make([]byte, len(origData))
	blockMode.CryptBlocks(encrypted, origData)
	return encrypted, err
}

func AesDecrypt(encrypted, key []byte) (bts []byte, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("%v", r)
		}
	}()
	block, err := aes.NewCipher(key)
	if err != nil {
		return
	}

	blockSize := block.BlockSize()
	blockMode := cipher.NewCBCDecrypter(block, key[:blockSize])
	origData := make([]byte, len(encrypted))
	blockMode.CryptBlocks(origData, encrypted)
	origData = PKCS5UnPadding(origData)
	return origData, err
}

func PKCS5Padding(ciphers []byte, blockSize int) []byte {
	padding := blockSize - len(ciphers)%blockSize
	paddings := bytes.Repeat([]byte{byte(padding)}, padding)
	return append(ciphers, paddings...)
}

func PKCS5UnPadding(origData []byte) []byte {
	length := len(origData)
	unPadding := int(origData[length-1])
	return origData[:(length - unPadding)]
}
