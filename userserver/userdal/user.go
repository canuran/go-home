package userdal

import (
	"context"
	"github.com/ewingtsai/go-web/utils"
	"time"

	"github.com/ewingtsai/go-web/config"
	"gorm.io/gorm"
)

type UserPO struct {
	ID           int64     `json:"id,omitempty" gorm:"autoIncrement;primaryKey"`
	Name         string    `json:"name,omitempty" gorm:"uniqueIndex;size:32"`
	Password     string    `json:"password,omitempty" gorm:"size:32"`
	Header       string    `json:"header,omitempty" gorm:"size:5120"` // 存储很小的头像
	Gender       string    `json:"gender,omitempty" gorm:"size:16"`
	Role         string    `json:"role,omitempty" gorm:"size:32"`
	Status       int       `json:"status,omitempty"`
	LoginVersion int64     `json:"login_version"`
	Sign         string    `json:"sign,omitempty" gorm:"size:128"`
	CreatedAt    time.Time `json:"created_at,omitempty"`
	UpdatedAt    time.Time `json:"updated_at,omitempty" gorm:"index"`
}

func (m *UserPO) TableName() string {
	return "user"
}

type UserParam struct {
	Entity       *UserPO
	SelectFields []string
	OmitFields   []string
	Offset       int
	Limit        int
}

func Init() {
	// 迁移 schema
	gormDB := config.GetDB(context.Background())
	utils.LogIfErr(gormDB.AutoMigrate(&UserPO{}))
}

func SaveUser(ctx context.Context, userParam *UserParam) error {
	db := config.GetDB(ctx)
	db = addUserParam(db, &UserParam{
		SelectFields: userParam.SelectFields,
		OmitFields:   userParam.OmitFields,
	})
	return db.Clauses(config.ConflictUpdateAll).
		Create(userParam.Entity).Error
}

func QueryUser(ctx context.Context, userParam *UserParam) ([]*UserPO, error) {
	db := config.GetDB(ctx).Model(&UserPO{})
	var users []*UserPO
	db = addUserParam(db, userParam).Find(&users)
	return users, db.Error
}

func QueryFirstUser(ctx context.Context, userParam *UserParam) (*UserPO, error) {
	if userParam != nil {
		userParam.Limit = 1
	}
	users, err := QueryUser(ctx, userParam)
	if len(users) > 0 {
		return users[0], err
	}
	return nil, err
}

func CountUser(ctx context.Context, userParam *UserParam) (int64, error) {
	db := config.GetDB(ctx).Model(&UserPO{})
	var users int64
	db = addUserParam(db, userParam).Count(&users)
	return users, db.Error
}

func addUserParam(db *gorm.DB, userParam *UserParam) *gorm.DB {
	if userParam == nil {
		return db
	}
	if len(userParam.SelectFields) > 0 {
		db = db.Select(userParam.SelectFields)
	}
	if len(userParam.OmitFields) > 0 {
		db = db.Omit(userParam.OmitFields...)
	}
	if userParam.Entity != nil {
		if userParam.Entity.ID > 0 {
			db = db.Where("id = ?", userParam.Entity.ID)
		}
		if len(userParam.Entity.Name) > 0 {
			db = db.Where("name = ?", userParam.Entity.Name)
		}
		if userParam.Entity.Status > 0 {
			db = db.Where("status = ?", userParam.Entity.Status)
		}
	}
	if userParam.Offset > 0 {
		db = db.Offset(userParam.Offset)
	}
	if userParam.Limit > 0 {
		db = db.Limit(userParam.Limit)
	}
	return db
}

func DeleteUser(ctx context.Context, user *UserPO) error {
	if user == nil || user.ID < 1 {
		return nil
	}
	db := config.GetDB(ctx).Delete(&user)
	return db.Error
}
