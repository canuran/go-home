package service

import (
	"context"
	"fmt"
	"log"

	"github.com/ewingtsai/go-web/util"

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
	if len(user.Header) > 102400 {
		return fmt.Errorf("头像文件太大")
	}
	users, err := dal.QueryUser(ctx, &model.User{Name: user.Name})
	if util.LogIfErr(err) {
		return err
	}
	if len(users) > 0 && users[0].ID != user.ID {
		return fmt.Errorf("用户名称%s已存在", user.Name)
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

func DeleteUser(ctx context.Context, user *model.User) error {
	return dal.DeleteUser(ctx, user)
}
