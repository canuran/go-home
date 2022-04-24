package repo

import (
	"context"
	"github.com/ewingtsai/go-home/common/errutil"
	"github.com/ewingtsai/go-home/config"
	"github.com/ewingtsai/go-home/generate/model"
	"github.com/ewingtsai/go-home/utils/jsoner"
	"testing"
)

const configDDL = `drop table if exists config;
create table if not exists config
(
    id         integer primary key autoincrement,
    config     text unique not null default '',
    value      text        not null default '',
    num        integer     not null default '',
    extra      text        not null default '',
    created_at datetime    not null default current_time,
    updated_at datetime    not null default current_time
);
create index if not exists idx_config_updated_at on config (updated_at);`

func init() {
	config.InitTest()
	gormDB, _ := config.ApplyDB(context.Background())
	errutil.LogIfErr(gormDB.Exec(configDDL).Error)
}

func TestSaveConfig(t *testing.T) {
	err := SaveConfig(context.Background(), &model.Config{
		Config: "worker",
		Value:  "value",
		Extra:  "extra",
		Num:    123,
	})
	if err != nil {
		t.Error(err)
	}
}

func TestGetConfig(t *testing.T) {
	configDO, err := GetConfig(context.Background(), "worker")
	if err != nil {
		t.Error(err)
	}
	println(jsoner.JsonMarshalString(configDO))
}

func TestUpdateConfigNotEmpty(t *testing.T) {
	err := UpdateConfig(context.Background(), &model.Config{
		Config: "worker",
		Num:    125,
		Value:  "你好",
	})
	if err != nil {
		t.Error(err)
	}
}
