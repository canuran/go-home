package jsoner

import (
	jsoniter "github.com/json-iterator/go"
	"log"
)

var Simple = NewAPI().
	MaxStringFieldLen(128).
	IntegerUnsafeToString()

func NewAPI() API {
	return &api{
		API: jsoniter.Config{
			SortMapKeys:            true,
			ValidateJsonRawMessage: true,
		}.Froze(),
	}
}

func Marshal(val any) []byte {
	bts, err := jsoniter.ConfigCompatibleWithStandardLibrary.Marshal(val)
	if err != nil {
		log.Println(err)
	}
	return bts
}

func Unmarshal(bts []byte, val any) {
	err := jsoniter.ConfigCompatibleWithStandardLibrary.Unmarshal(bts, val)
	if err != nil {
		log.Println(err)
	}
}

func MarshalString(val any) string {
	return string(Marshal(val))
}

func UnmarshalString(input string, val any) {
	Unmarshal([]byte(input), val)
}

func MarshalLogString(val any) string {
	marshal, err := Simple.MarshalToString(val)
	if err != nil {
		log.Println(err)
	}
	return marshal
}

func UnmarshalLogString(input string, val any) {
	err := Simple.UnmarshalFromString(input, val)
	if err != nil {
		log.Println(err)
	}
}

type API interface {
	Config(config jsoniter.Config) API
	MaxStringFieldLen(maxLen int) API
	IntegerUnsafeToString() API
	jsoniter.API
}

type api struct {
	jsoniter.API
}

func (b *api) Config(config jsoniter.Config) API {
	b.API = config.Froze()
	return b
}

func (b *api) MaxStringFieldLen(maxLen int) API {
	b.API.RegisterExtension(&StringCodecExtension{
		MaxLen: maxLen,
	})
	return b
}

func (b *api) IntegerUnsafeToString() API {
	b.API.RegisterExtension(&Int64CodecExtension{
		UnsafeToString: true,
	})
	b.API.RegisterExtension(&Uint64CodecExtension{
		UnsafeToString: true,
	})
	return b
}
