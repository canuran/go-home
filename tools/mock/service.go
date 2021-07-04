package mock

import "encoding/json"

var (
	// 依赖
	getAFunc func(in string) string
	getBFunc func(in string) string
)

func Init() {
	// 注入依赖
	getAFunc = GetA
	getBFunc = GetB
}

func GetAB(in string) string {
	return getAFunc(getBFunc(in))
}

func GetJson(in string) (interface{}, error) {
	var data map[string]interface{}
	err := json.Unmarshal([]byte(in), &data)
	data["extra"] = 250
	return data, err
}
