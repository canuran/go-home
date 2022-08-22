package repo

import (
	"context"
	"fmt"
	"github.com/canuran/go-home/common"
	"github.com/canuran/go-home/common/errutil"
	"github.com/canuran/go-home/config"
	"github.com/canuran/go-home/generate/model"
	"github.com/canuran/go-home/utils/jsoner"
	"github.com/stretchr/testify/assert"
	"testing"
)

const userDDL = `drop table if exists user;
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
	gormDB, _ := config.GetDB(context.Background())
	errutil.HandlerError(gormDB.Exec(userDDL).Error)
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
	assert.Nil(t, err)
}

func TestQueryUser(t *testing.T) {
	users, count, err := QueryUserPage(context.Background(), QueryOption{
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
	assert.Nil(t, err)
	fmt.Println(count)
	fmt.Println(jsoner.MarshalString(users))
}
