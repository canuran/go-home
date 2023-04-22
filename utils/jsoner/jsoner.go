package jsoner

import (
	jsoniter "github.com/json-iterator/go"
	"log"
)

var LogJsoner = NewAPI().
	MaxStringFieldLen(256).
	MaxSliceFieldLen(32).
	EncodeIntegerSafely().
	DecodeGeneralDate()

func NewAPI() API {
	return &api{API: jsoniter.Config{
		EscapeHTML:             true,
		SortMapKeys:            true,
		ValidateJsonRawMessage: true,
	}.Froze()}
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
	marshal, err := LogJsoner.MarshalToString(val)
	if err != nil {
		log.Println(err)
	}
	return marshal
}

func UnmarshalLogString(input string, val any) {
	err := LogJsoner.UnmarshalFromString(input, val)
	if err != nil {
		log.Println(err)
	}
}

type API interface {
	jsoniter.API
	UseAPI(api jsoniter.API) API
	MaxSliceFieldLen(maxLen int) API
	MaxStringFieldLen(maxLen int) API
	EncodeIntegerSafely() API
	DecodeGeneralDate() API
}

type api struct {
	jsoniter.API
}

func (b *api) UseAPI(api jsoniter.API) API {
	b.API = api
	return b
}

func (b *api) MaxSliceFieldLen(maxLen int) API {
	b.API.RegisterExtension(&SliceMaxLenExtension{
		MaxLen: maxLen,
	})
	return b
}

func (b *api) MaxStringFieldLen(maxLen int) API {
	b.API.RegisterExtension(&StringMaxLenExtension{
		MaxLen: maxLen,
	})
	return b
}

func (b *api) EncodeIntegerSafely() API {
	b.API.RegisterExtension(&SafeInt64Extension{})
	b.API.RegisterExtension(&SafeUint64Extension{})
	return b
}

func (b *api) DecodeGeneralDate() API {
	b.API.RegisterExtension(&GeneralDateExtension{})
	return b
}
