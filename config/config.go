package config

import (
	"context"
	"github.com/ewingtsai/go-home/generate/query"
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
