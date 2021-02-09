package jsoner

import (
	"encoding/json"
	"github.com/ewingtsai/go-web/utils/errorer"
)

func JsonMarshal(val interface{}) []byte {
	bts, err := json.Marshal(val)
	errorer.LogIfErr(err)
	return bts
}

func JsonUnmarshal(bts []byte, val interface{}) {
	err := json.Unmarshal(bts, val)
	errorer.LogIfErr(err)
}

func JsonMarshalString(val interface{}) string {
	return string(JsonMarshal(val))
}

func JsonUnmarshalString(input string, val interface{}) {
	JsonUnmarshal([]byte(input), val)
}
