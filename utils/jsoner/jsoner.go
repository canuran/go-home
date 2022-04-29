package jsoner

import (
	jsoniter "github.com/json-iterator/go"
	"log"
)

func JsonMarshal(val any) []byte {
	bts, err := jsoniter.ConfigCompatibleWithStandardLibrary.Marshal(val)
	if err != nil {
		log.Println(err)
		return nil
	}
	return bts
}

func JsonUnmarshal(bts []byte, val any) {
	err := jsoniter.ConfigCompatibleWithStandardLibrary.Unmarshal(bts, val)
	if err != nil {
		log.Println(err)
	}
}

func JsonMarshalString(val any) string {
	return string(JsonMarshal(val))
}

func JsonUnmarshalString(input string, val any) {
	JsonUnmarshal([]byte(input), val)
}
