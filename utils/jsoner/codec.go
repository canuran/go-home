package jsoner

import (
	jsoniter "github.com/json-iterator/go"
	"github.com/modern-go/reflect2"
	"reflect"
	"strconv"
	"unsafe"
)

const (
	JsonSafeMaxInteger = (1 << 53) - 1
	JsonSafeMinInteger = -JsonSafeMaxInteger
)

var (
	StringType2 = reflect2.DefaultTypeOfKind(reflect.String)
	Int64Type2  = reflect2.DefaultTypeOfKind(reflect.Int64)
	Uint64Type2 = reflect2.DefaultTypeOfKind(reflect.Uint64)
)

type StringCodecExtension struct {
	jsoniter.DummyExtension
	MaxLen int
}

func (codec *StringCodecExtension) Decode(ptr unsafe.Pointer, iter *jsoniter.Iterator) {
	*((*string)(ptr)) = iter.ReadString()
}

func (codec *StringCodecExtension) Encode(ptr unsafe.Pointer, stream *jsoniter.Stream) {
	str := *((*string)(ptr))
	if codec.MaxLen > 0 && len(str) > codec.MaxLen {
		runes := []rune(str)
		if len(runes) > codec.MaxLen {
			str = string(runes[:codec.MaxLen])
		}
	}
	stream.WriteStringWithHTMLEscaped(str)
}

func (codec *StringCodecExtension) IsEmpty(ptr unsafe.Pointer) bool {
	return *((*string)(ptr)) == ""
}

func (codec *StringCodecExtension) CreateEncoder(typ reflect2.Type) jsoniter.ValEncoder {
	if typ == StringType2 {
		return codec
	}
	return nil
}

func (codec *StringCodecExtension) CreateDecoder(typ reflect2.Type) jsoniter.ValDecoder {
	if typ == StringType2 {
		return codec
	}
	return nil
}

type Int64CodecExtension struct {
	jsoniter.DummyExtension
	UnsafeToString bool
}

func (codec *Int64CodecExtension) Decode(ptr unsafe.Pointer, iter *jsoniter.Iterator) {
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

func (codec *Int64CodecExtension) Encode(ptr unsafe.Pointer, stream *jsoniter.Stream) {
	value := *((*int64)(ptr))
	if codec.UnsafeToString && (value < JsonSafeMinInteger || value > JsonSafeMaxInteger) {
		stream.WriteString(strconv.FormatInt(value, 10))
	} else {
		stream.WriteInt64(value)
	}
}

func (codec *Int64CodecExtension) IsEmpty(ptr unsafe.Pointer) bool {
	return *((*int64)(ptr)) == 0
}

func (codec *Int64CodecExtension) CreateEncoder(typ reflect2.Type) jsoniter.ValEncoder {
	if typ == Int64Type2 {
		return codec
	}
	return nil
}

func (codec *Int64CodecExtension) CreateDecoder(typ reflect2.Type) jsoniter.ValDecoder {
	if typ == Int64Type2 {
		return codec
	}
	return nil
}

type Uint64CodecExtension struct {
	jsoniter.DummyExtension
	UnsafeToString bool
}

func (codec *Uint64CodecExtension) Decode(ptr unsafe.Pointer, iter *jsoniter.Iterator) {
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

func (codec *Uint64CodecExtension) Encode(ptr unsafe.Pointer, stream *jsoniter.Stream) {
	value := *((*uint64)(ptr))
	if codec.UnsafeToString && value > JsonSafeMaxInteger {
		stream.WriteString(strconv.FormatUint(value, 10))
	} else {
		stream.WriteUint64(value)
	}
}

func (codec *Uint64CodecExtension) IsEmpty(ptr unsafe.Pointer) bool {
	return *((*uint64)(ptr)) == 0
}

func (codec *Uint64CodecExtension) CreateEncoder(typ reflect2.Type) jsoniter.ValEncoder {
	if typ == Uint64Type2 {
		return codec
	}
	return nil
}

func (codec *Uint64CodecExtension) CreateDecoder(typ reflect2.Type) jsoniter.ValDecoder {
	if typ == Uint64Type2 {
		return codec
	}
	return nil
}
