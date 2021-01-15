package jsons

import (
	"encoding/json"
	"github.com/ewingtsai/go-web/common"
)

func JsonMarshal(val interface{}) []byte {
	bts, err := json.Marshal(val)
	common.LogIfErr(err)
	return bts
}

func JsonUnmarshal(bts []byte, val interface{}) {
	err := json.Unmarshal(bts, val)
	common.LogIfErr(err)
}

func JsonMarshalString(val interface{}) string {
	return string(JsonMarshal(val))
}

func JsonUnmarshalString(input string, val interface{}) {
	JsonUnmarshal([]byte(input), val)
}
