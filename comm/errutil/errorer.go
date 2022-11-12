package errutil

import (
	"github.com/sirupsen/logrus"
)

func HandlerError(err error) bool {
	if err != nil {
		logrus.Error(err)
		return true
	}
	return false
}
