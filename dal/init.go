package dal

import (
	"context"

	"github.com/ewingtsai/go-web/model"
	"github.com/ewingtsai/go-web/util"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

var (
	debug               bool
	gormDB              *gorm.DB
	txDbKey             = "txDbKey"
	onConflictUpdateAll = clause.OnConflict{UpdateAll: true}
)

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
	// 迁移 schema
	util.LogIfErr(gormDB.AutoMigrate(&model.User{}))
	initData()
}

func getDB(ctx context.Context) *gorm.DB {
	txDB, ok := ctx.Value(txDbKey).(*gorm.DB)
	if txDB != nil && !ok {
		return txDB
	}
	if debug {
		return gormDB.Debug()
	}
	return gormDB
}

func Transaction(ctx context.Context, exec func(ctx context.Context) error) error {
	txDB, ok := ctx.Value(txDbKey).(*gorm.DB)
	// 尚未开启过事务
	if txDB == nil || !ok {
		if debug {
			txDB = gormDB.Debug().Begin()
		} else {
			txDB = gormDB.Begin()
		}
		paniced := true
		var err error
		defer func() {
			if paniced || err != nil {
				txDB.Rollback()
			}
		}()
		ctx = context.WithValue(ctx, txDbKey, txDB)
		err = exec(ctx)
		if err == nil {
			err = txDB.Commit().Error
		}
		paniced = false
		return err
	}
	// 已经包含在事务中了
	return exec(ctx)
}

func initData() {
	util.LogIfErr(gormDB.Clauses(onConflictUpdateAll).Create(&model.User{ID: 1, Name: "元宝"}).Error)
	util.LogIfErr(gormDB.Clauses(onConflictUpdateAll).Create(&model.User{ID: 2, Name: "妲己"}).Error)
	util.LogIfErr(gormDB.Clauses(onConflictUpdateAll).Create(&model.User{ID: 3, Name: "亚瑟"}).Error)
	util.LogIfErr(gormDB.Clauses(onConflictUpdateAll).Create(&model.User{ID: 4, Name: "小乔"}).Error)
	util.LogIfErr(gormDB.Clauses(onConflictUpdateAll).Create(&model.User{ID: 5, Name: "后羿"}).Error)
}
