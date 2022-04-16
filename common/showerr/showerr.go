package showerr

import (
	"errors"
	"fmt"
	"github.com/ewingtsai/go-web/common/consts"
	"strconv"
)

// ShowErr 用于提示用户的错误
type ShowErr struct {
	error
	Code int
}

func New(msg string) ShowErr {
	return ShowErr{error: errors.New(msg), Code: consts.CodeFailure}
}

func NewWithErr(err error) ShowErr {
	return ShowErr{error: err, Code: consts.CodeFailure}
}

func NewWithCode(code int) ShowErr {
	return ShowErr{error: errors.New(strconv.Itoa(code)), Code: code}
}

func NewWithCodeAndMsg(code int, msg string) ShowErr {
	return ShowErr{error: errors.New(msg), Code: code}
}

func NewWithCodeAndErr(code int, err error) ShowErr {
	return ShowErr{error: err, Code: code}
}

func Format(format string, args ...interface{}) ShowErr {
	return ShowErr{error: fmt.Errorf(format, args...), Code: consts.CodeFailure}
}

func FormatWithCode(code int, format string, args ...interface{}) ShowErr {
	return ShowErr{error: fmt.Errorf(format, args...), Code: code}
}
