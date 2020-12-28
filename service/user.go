package service

import (
	"context"
	"fmt"
	"github.com/ewingtsai/go-web/util"
	"log"

	"github.com/ewingtsai/go-web/dal"
	"github.com/ewingtsai/go-web/model"
)

func SaveUser(ctx context.Context, user *model.User) error {
	if user == nil {
		return nil
	}
	log.Printf("SaveUser:id=%d", user.ID)
	user.Name = string(util.FilterName([]rune(user.Name)))
	if len(user.Name) < 1 {
		return fmt.Errorf("用户名不能为空")
	}
	return dal.Transaction(ctx, func(ctx context.Context) error {
		return dal.SaveUser(ctx, user)
	})
}

func QueryUser(ctx context.Context, user *model.User) ([]*model.User, error) {
	return dal.QueryUser(ctx, user)
}

func CountUser(ctx context.Context, user *model.User) (int64, error) {
	return dal.CountUser(ctx, user)
}

func DeleteUser(ctx context.Context, user *model.User)  error {
	return dal.DeleteUser(ctx, user)
}
