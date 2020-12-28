package dal

import (
	"context"

	"github.com/ewingtsai/go-web/model"
	"gorm.io/gorm"
)

func SaveUser(ctx context.Context, user *model.User) error {
	db := getDB(ctx)
	return db.Clauses(onConflictUpdateAll).Create(user).Error
}

func QueryUser(ctx context.Context, user *model.User) ([]*model.User, error) {
	db := getDB(ctx).Model(&model.User{})
	var users []*model.User
	db = addUserWhere(db, user).Find(&users)
	return users, db.Error
}

func CountUser(ctx context.Context, user *model.User) (int64, error) {
	db := getDB(ctx).Model(&model.User{})
	var users int64
	db = addUserWhere(db, user).Count(&users)
	return users, db.Error
}

func addUserWhere(db *gorm.DB, user *model.User) *gorm.DB {
	if user == nil {
		return db
	}
	if user.ID > 0 {
		db = db.Where("id = ?", user.ID)
	}
	if len(user.Name) > 0 {
		db = db.Where("name like ?", user.Name+"%")
	}
	return db
}

func DeleteUser(ctx context.Context, user *model.User)  error {
	if user == nil || user.ID < 1 {
		return nil
	}
	db := getDB(ctx).Delete(&user)
	return db.Error
}