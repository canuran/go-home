package errutil

import (
	"github.com/sirupsen/logrus"
	"testing"
)

func LogIfErr(err error) bool {
	if err != nil {
		logrus.Error(err)
		return true
	}
	return false
}

func TestingErr(t *testing.T, err error) bool {
	if err != nil {
		t.Error(err)
		return true
	}
	return false
}
