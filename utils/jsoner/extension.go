package jsoner

import (
	"github.com/ewingtsai/go-home/utils/valuer"
	jsoniter "github.com/json-iterator/go"
	"github.com/modern-go/reflect2"
	"reflect"
	"strconv"
	"time"
	"unsafe"
)

const (
	JsonSafeMaxInteger = (1 << 53) - 1
	JsonSafeMinInteger = -JsonSafeMaxInteger
)

type SliceMaxLenExtension struct {
	jsoniter.DummyExtension
	encoder jsoniter.ValEncoder
	MaxLen  int
}

func (extension *SliceMaxLenExtension) DecorateEncoder(typ reflect2.Type,
	encoder jsoniter.ValEncoder) jsoniter.ValEncoder {
	if typ.Kind() == reflect.Slice {
		return &SliceMaxLenExtension{encoder: encoder, MaxLen: extension.MaxLen}
	}
	return encoder
}

func (extension *SliceMaxLenExtension) Encode(ptr unsafe.Pointer, stream *jsoniter.Stream) {
	slice := (*reflect.SliceHeader)(ptr)
	if slice.Len > extension.MaxLen {
		extension.encoder.Encode(unsafe.Pointer(&reflect.SliceHeader{
			Data: slice.Data,
			Len:  extension.MaxLen,
			Cap:  slice.Cap,
		}), stream)
		return
	}
	extension.encoder.Encode(ptr, stream)
}

func (extension *SliceMaxLenExtension) IsEmpty(ptr unsafe.Pointer) bool {
	return extension.encoder.IsEmpty(ptr)
}

type StringMaxLenExtension struct {
	jsoniter.DummyExtension
	encoder jsoniter.ValEncoder
	MaxLen  int
}

func (extension *StringMaxLenExtension) DecorateEncoder(typ reflect2.Type,
	encoder jsoniter.ValEncoder) jsoniter.ValEncoder {
	if typ.Kind() == reflect.String {
		return &StringMaxLenExtension{encoder: encoder, MaxLen: extension.MaxLen}
	}
	return encoder
}

func (extension *StringMaxLenExtension) Encode(ptr unsafe.Pointer, stream *jsoniter.Stream) {
	str := *(*string)(ptr)
	if len(str) > extension.MaxLen {
		runes := []rune(str)
		if len(runes) > extension.MaxLen {
			str = string(runes[:extension.MaxLen])
			extension.encoder.Encode(unsafe.Pointer(&str), stream)
			return
		}
	}
	extension.encoder.Encode(ptr, stream)
}

func (extension *StringMaxLenExtension) IsEmpty(ptr unsafe.Pointer) bool {
	return extension.encoder.IsEmpty(ptr)
}

type SafeInt64Extension struct {
	jsoniter.DummyExtension
}

func (extension *SafeInt64Extension) Decode(ptr unsafe.Pointer, iter *jsoniter.Iterator) {
	switch iter.WhatIsNext() {
	case jsoniter.StringValue:
		var err error
		*((*int64)(ptr)), err = strconv.ParseInt(iter.ReadString(), 10, 64)
		if err != nil {
			iter.ReportError("ParseInt", err.Error())
		}
	case jsoniter.NilValue:
		// omit nil value
	default:
		*((*int64)(ptr)) = iter.ReadInt64()
	}
}

func (extension *SafeInt64Extension) Encode(ptr unsafe.Pointer, stream *jsoniter.Stream) {
	value := *((*int64)(ptr))
	if value < JsonSafeMinInteger || value > JsonSafeMaxInteger {
		stream.WriteString(strconv.FormatInt(value, 10))
	} else {
		stream.WriteInt64(value)
	}
}

func (extension *SafeInt64Extension) IsEmpty(ptr unsafe.Pointer) bool {
	return *((*int64)(ptr)) == 0
}

func (extension *SafeInt64Extension) CreateEncoder(typ reflect2.Type) jsoniter.ValEncoder {
	if typ.Kind() == reflect.Int64 {
		return extension
	}
	return nil
}

func (extension *SafeInt64Extension) CreateDecoder(typ reflect2.Type) jsoniter.ValDecoder {
	if typ.Kind() == reflect.Int64 {
		return extension
	}
	return nil
}

type SafeUint64Extension struct {
	jsoniter.DummyExtension
}

func (extension *SafeUint64Extension) Decode(ptr unsafe.Pointer, iter *jsoniter.Iterator) {
	switch iter.WhatIsNext() {
	case jsoniter.StringValue:
		var err error
		*((*uint64)(ptr)), err = strconv.ParseUint(iter.ReadString(), 10, 64)
		if err != nil {
			iter.ReportError("ParseUint", err.Error())
		}
	case jsoniter.NilValue:
		// omit nil value
	default:
		*((*uint64)(ptr)) = iter.ReadUint64()
	}
}

func (extension *SafeUint64Extension) Encode(ptr unsafe.Pointer, stream *jsoniter.Stream) {
	value := *((*uint64)(ptr))
	if value > JsonSafeMaxInteger {
		stream.WriteString(strconv.FormatUint(value, 10))
	} else {
		stream.WriteUint64(value)
	}
}

func (extension *SafeUint64Extension) IsEmpty(ptr unsafe.Pointer) bool {
	return *((*uint64)(ptr)) == 0
}

func (extension *SafeUint64Extension) CreateEncoder(typ reflect2.Type) jsoniter.ValEncoder {
	if typ.Kind() == reflect.Uint64 {
		return extension
	}
	return nil
}

func (extension *SafeUint64Extension) CreateDecoder(typ reflect2.Type) jsoniter.ValDecoder {
	if typ.Kind() == reflect.Uint64 {
		return extension
	}
	return nil
}

type GeneralDateExtension struct {
	jsoniter.DummyExtension
}

func (extension *GeneralDateExtension) Decode(ptr unsafe.Pointer, iter *jsoniter.Iterator) {
	switch iter.WhatIsNext() {
	case jsoniter.NumberValue:
		nanoseconds := iter.ReadInt64() * time.Millisecond.Nanoseconds()
		*((*time.Time)(ptr)) = time.Unix(0, nanoseconds)
	case jsoniter.NilValue:
		// omit nil value
	default:
		*((*time.Time)(ptr)) = valuer.ParseGeneralDate([]rune(iter.ReadString()))
	}
}

func (extension *GeneralDateExtension) CreateDecoder(typ reflect2.Type) jsoniter.ValDecoder {
	if typ == reflect2.TypeOf(time.Now()) {
		return extension
	}
	return nil
}
