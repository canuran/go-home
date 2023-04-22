package errorer

import (
	"errors"
	"fmt"
	"github.com/canuran/go-home/comm/consts"
	"github.com/sirupsen/logrus"
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
	Status int
}

func New(msg string) *StatusError {
	return &StatusError{Err: errors.New(msg), Status: consts.CodeFailure}
}

func From(err error) *StatusError {
	return &StatusError{Err: err, Status: consts.CodeFailure}
}

func Format(format string, args ...any) *StatusError {
	return From(fmt.Errorf(format, args...))
}

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
	return c.Error()
}

func (c *StatusError) Error() string {
	return fmt.Sprintf("status:%d, error:%v", c.Status, c.Err)
}
