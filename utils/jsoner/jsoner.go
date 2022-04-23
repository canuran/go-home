package jsoner

import (
	"github.com/ewingtsai/go-home/utils/errorer"
	jsoniter "github.com/json-iterator/go"
)

func JsonMarshal(val interface{}) []byte {
	bts, err := jsoniter.ConfigCompatibleWithStandardLibrary.Marshal(val)
	errorer.LogIfErr(err)
	return bts
}

func JsonUnmarshal(bts []byte, val interface{}) {
	err := jsoniter.ConfigCompatibleWithStandardLibrary.Unmarshal(bts, val)
	errorer.LogIfErr(err)
}

func JsonMarshalString(val interface{}) string {
	return string(JsonMarshal(val))
}

func JsonUnmarshalString(input string, val interface{}) {
	JsonUnmarshal([]byte(input), val)
}
