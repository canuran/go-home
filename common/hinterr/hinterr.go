package hinterr

import (
	"errors"
	"fmt"
	"github.com/ewingtsai/go-web/common/consts"
	"strconv"
)

// HintErr 用于提示用户的错误
type HintErr struct {
	error
	Code int
}

func New(msg string) HintErr {
	return HintErr{error: errors.New(msg), Code: consts.CodeFailure}
}

func NewWithErr(err error) HintErr {
	return HintErr{error: err, Code: consts.CodeFailure}
}

func NewWithCode(code int) HintErr {
	return HintErr{error: errors.New(strconv.Itoa(code)), Code: code}
}

func NewWithCodeAndMsg(code int, msg string) HintErr {
	return HintErr{error: errors.New(msg), Code: code}
}

func NewWithCodeAndErr(code int, err error) HintErr {
	return HintErr{error: err, Code: code}
}

func Format(format string, args ...interface{}) HintErr {
	return HintErr{error: fmt.Errorf(format, args...), Code: consts.CodeFailure}
}

func FormatWithCode(code int, format string, args ...interface{}) HintErr {
	return HintErr{error: fmt.Errorf(format, args...), Code: code}
}
