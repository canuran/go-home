package util

import (
	"encoding/json"
	"log"
	"testing"
)

func LogIfErr(err error) {
	if err != nil {
		log.Println(err)
	}
}

func TestingErr(t *testing.T, err error) {
	if err != nil {
		t.Error(err)
	}
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
