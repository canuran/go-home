package util

import (
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"log"
	"testing"
)

func LogIfErr(err error) bool {
	if err != nil {
		log.Println(err)
		return true
	}
	return false
}

func TestingErr(t *testing.T, err error) bool {
	if err != nil {
		t.Error(err)
		return true
	}
	return false
}

func JsonMarshal(val interface{}) []byte {
	bts, err := json.Marshal(val)
	LogIfErr(err)
	return bts
}

func JsonUnmarshal(bts []byte, val interface{}) {
	err := json.Unmarshal(bts, val)
	LogIfErr(err)
}

func Close(cls interface{ Close() error }) {
	if cls != nil {
		LogIfErr(cls.Close())
	}
}

func StringMd5(input string) string {
	bts := md5.Sum([]byte(input))
	return hex.EncodeToString(bts[:])
}
