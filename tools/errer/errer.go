package errer

import (
	log "github.com/sirupsen/logrus"
	"testing"
)

func LogIfErr(err error) bool {
	if err != nil {
		log.Println(err)
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
