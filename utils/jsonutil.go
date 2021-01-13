package utils

import "encoding/json"

func JsonMarshal(val interface{}) []byte {
	bts, err := json.Marshal(val)
	LogIfErr(err)
	return bts
}

func JsonUnmarshal(bts []byte, val interface{}) {
	err := json.Unmarshal(bts, val)
	LogIfErr(err)
}

func JsonMarshalString(val interface{}) string {
	return string(JsonMarshal(val))
}

func JsonUnmarshalString(input string, val interface{}) {
	JsonUnmarshal([]byte(input), val)
}
