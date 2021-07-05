package mock

import (
	"encoding/json"
	. "github.com/agiledragon/gomonkey"
	"github.com/ewingtsai/go-web/utils/jsoner"
	. "github.com/smartystreets/goconvey/convey"
	"testing"
)

func TestGetJsonMap(t *testing.T) {
	Convey("description", t, func() {
		patches := ApplyFunc(json.Unmarshal,
			func(in []byte, data interface{}) error {
				pData := data.(*map[string]interface{})
				*pData = map[string]interface{}{string(in): 123}
				return nil
			})
		defer patches.Reset()
		data, err := GetJsonMap("abc")
		ShouldNotBeNil(err)
		println(jsoner.JsonMarshalString(data))
	})
}
