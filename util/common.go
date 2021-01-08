package util

import (
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

func Close(cls interface{ Close() error }) {
	if cls != nil {
		LogIfErr(cls.Close())
	}
}

