package dal

import (
	"context"

	"github.com/ewingtsai/go-web/config"
	"github.com/ewingtsai/go-web/model"
	"gorm.io/gorm"
)

type UserParam struct {
	Entity       *model.User
	SelectFields []string
	OmitFields   []string
	Offset       int
	Limit        int
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

func QueryUser(ctx context.Context, userParam *UserParam) ([]*model.User, error) {
	db := config.GetDB(ctx).Model(&model.User{})
	var users []*model.User
	db = addUserParam(db, userParam).Find(&users)
	return users, db.Error
}

func QueryFirstUser(ctx context.Context, userParam *UserParam) (*model.User, error) {
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
	db := config.GetDB(ctx).Model(&model.User{})
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

func DeleteUser(ctx context.Context, user *model.User) error {
	if user == nil || user.ID < 1 {
		return nil
	}
	db := config.GetDB(ctx).Delete(&user)
	return db.Error
}
