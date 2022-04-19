package config

import (
	"context"
	"github.com/ewingtsai/go-web/generate/query"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

var (
	debug             bool
	gormDB            *gorm.DB
	ctxDbKey          = dbKey(1)
	ConflictUpdateAll = clause.OnConflict{UpdateAll: true}
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
	query.SetDefault(gormDB)
}

// ApplyDB 从Context中获取DB对象
// 如果没有DB对象则添加DB并且返回新的Context
func ApplyDB(ctx context.Context) (*gorm.DB, context.Context) {
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

// Transaction 开启并使用Context传递事务
// 注意在使用WithDB时必须使用run函数的Context参数
func Transaction(ctx context.Context, run func(ctx context.Context) error) error {
	txDB, ctx := ApplyDB(ctx)
	return txDB.Transaction(func(tx *gorm.DB) error {
		ctx = context.WithValue(ctx, ctxDbKey, tx)
		return run(ctx)
	})
}
