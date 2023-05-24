package errorer

import (
	"errors"
	"fmt"
	"github.com/sirupsen/logrus"
	"net/http"
)

func HandlerError(err error) bool {
	if err != nil {
		logrus.Error(err)
		return true
	}
	return false
}

type StatusError struct {
	Err    error
	Status int // 自定义的状态码应当大于1000
}

func New(msg string) *StatusError {
	return &StatusError{Err: errors.New(msg), Status: http.StatusInternalServerError}
}

func From(err error) *StatusError {
	return &StatusError{Err: err, Status: http.StatusInternalServerError}
}

func Format(format string, args ...any) *StatusError {
	return From(fmt.Errorf(format, args...))
}

// SetStatus 自定义的状态码应当大于1000
func (c *StatusError) SetStatus(status int) *StatusError {
	c.Status = status
	return c
}

func (c *StatusError) SetError(err error) *StatusError {
	c.Err = err
	return c
}

func (c *StatusError) SetMessage(msg string) *StatusError {
	c.Err = errors.New(msg)
	return c
}

func (c *StatusError) String() string {
	return fmt.Sprintf("status:%d, error:%v", c.Status, c.Err)
}

func (c *StatusError) Error() string {
	if c.Err == nil {
		return ""
	}
	return c.Err.Error()
}
