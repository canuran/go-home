package configdal

import (
	"context"
	"github.com/ewingtsai/go-web/config"
	"github.com/ewingtsai/go-web/utils/jsoner"
	"testing"
)

func initForTest() {
	config.InitTest()
	Init()
}

func TestGetConfig(t *testing.T) {
	initForTest()
	configDO, err := GetConfig(context.Background(), "worker")
	if err != nil {
		t.Error(err)
	}
	println(jsoner.JsonMarshalString(configDO))
}

func TestSaveConfig(t *testing.T) {
	initForTest()
	err := SaveConfig(context.Background(), &ConfigDO{
		Config: "worker",
		Value:  "value",
		Extra:  "extra",
		Num:    123,
	})
	if err != nil {
		t.Error(err)
	}
}

func TestUpdateConfigNotEmpty(t *testing.T) {
	initForTest()
	err := UpdateConfigNotEmpty(context.Background(), &ConfigDO{
		Config: "worker",
		Num:    125,
		Value:  "你好",
	})
	if err != nil {
		t.Error(err)
	}
}
