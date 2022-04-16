package userdal

import (
	"context"
	"fmt"
	"github.com/ewingtsai/go-web/common"
	"github.com/ewingtsai/go-web/config"
	"github.com/ewingtsai/go-web/generate/gormgen/model"
	"github.com/ewingtsai/go-web/utils/errorer"
	"github.com/ewingtsai/go-web/utils/jsoner"
	"testing"
)

const ddl = `drop table if exists user;
create table if not exists user
(
    id           integer primary key autoincrement,
    name         text unique not null default '',
    password     text        not null default '',
    header       text        not null default '',
    gender       text        not null default '',
    role         text        not null default '',
    status       integer     not null default 0,
    auth_version integer     not null default 0,
    sign         text        not null default '',
    created_at   datetime    not null default current_time,
    updated_at   datetime    not null default current_time
);
create index if not exists idx_user_updated_at on user (updated_at);`

func init() {
	config.InitTest()
	gormDB := config.GetDB(context.Background())
	errorer.LogIfErr(gormDB.Exec(ddl).Error)
}

func TestSaveUser(t *testing.T) {
	err := SaveUser(context.Background(), &model.User{
		ID:   1,
		Name: "元宝",
	}, SaveOption{
		OmitHeader:      true,
		OmitPassword:    true,
		OmitAuthVersion: true,
	})
	if errorer.TestingErr(t, err) {
		return
	}
}

func TestQueryUser(t *testing.T) {
	users, count, err := QueryUser(context.Background(), QueryOption{
		NameEq:        "元宝",
		NameStartWith: "元宝",
		OmitHeader:    false,
		OmitPassword:  false,
	}, common.Pager{
		Offset:   0,
		Limit:    10,
		GetRows:  true,
		GetCount: true,
	})
	if errorer.TestingErr(t, err) {
		return
	}
	fmt.Println(count)
	fmt.Println(jsoner.JsonMarshalString(users))
}
