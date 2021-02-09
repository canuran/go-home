package jsons

import (
	"encoding/json"
	"github.com/ewingtsai/go-web/tools/errer"
)

func JsonMarshal(val interface{}) []byte {
	bts, err := json.Marshal(val)
	errer.LogIfErr(err)
	return bts
}

func JsonUnmarshal(bts []byte, val interface{}) {
	err := json.Unmarshal(bts, val)
	errer.LogIfErr(err)
}

func JsonMarshalString(val interface{}) string {
	return string(JsonMarshal(val))
}

func JsonUnmarshalString(input string, val interface{}) {
	JsonUnmarshal([]byte(input), val)
}
