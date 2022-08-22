package config

import (
	"context"
	"github.com/canuran/go-home/generate/query"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

var (
	debug             bool
	gormDB            *gorm.DB
	ctxDbKey          = dbKey(1)
	ConflictUpdateAll = clause.OnConflict{UpdateAll: true}
	JwtSecret         = []byte("MAQoSrhbNoK312x2")
)

type dbKey int // 专属Key

func Init() {
	initGorm(sqlite.Open("web.db"))
}

func InitTest() {
	debug = true
	initGorm(sqlite.Open("test.db"))
}

func initGorm(dail gorm.Dialector) {
	config := &gorm.Config{}
	var err error
	gormDB, err = gorm.Open(dail, config)
	if err != nil {
		panic("connect database fail")
	}
	gormDB.Exec(initTable)
	query.SetDefault(gormDB)
}

// GetDB 从Context中获取DB对象
// 如果没有DB对象则添加DB并且返回新的Context
func GetDB(ctx context.Context) (*gorm.DB, context.Context) {
	db, ok := ctx.Value(ctxDbKey).(*gorm.DB)
	if db != nil && ok {
		return db, ctx
	}
	db = gormDB
	if debug {
		db = db.Debug()
	}
	return db, context.WithValue(ctx, ctxDbKey, db)
}

var initTable = `
create table if not exists user
(
    id           integer  primary key autoincrement,
    name         text     default '' not null unique,
    password     text     default '' not null,
    header       text     default '' not null,
    gender       text     default '' not null,
    role         text     default '' not null,
    status       integer  default 0 not null,
    auth_version integer  default 0 not null,
    sign         text     default '' not null,
    created_at   datetime default current_time not null,
    updated_at   datetime default current_time not null
);

create index  if not exists  idx_user_updated_at
    on user (updated_at);

create table if not exists config
(
    id         integer  primary key autoincrement,
    config     text     default '' not null unique,
    value      text     default '' not null,
    num        integer  default '' not null,
    extra      text     default '' not null,
    created_at datetime default current_time not null,
    updated_at datetime default current_time not null
);

create index if not exists idx_config_updated_at
    on config (updated_at);
`
