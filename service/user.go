package service

import (
	"context"
	"fmt"
	"github.com/ewingtsai/go-web/common"
	"log"

	"github.com/ewingtsai/go-web/config"
	"github.com/ewingtsai/go-web/dal"
	"github.com/ewingtsai/go-web/model"
	"github.com/ewingtsai/go-web/util"
)

func SaveUser(ctx context.Context, user *model.User) error {
	if user == nil {
		return nil
	}
	user.Name = util.StandardizeString(user.Name)
	log.Printf("SaveUser:id=%d,name=%s", user.ID, user.Name)
	if len(user.Name) < 1 {
		return fmt.Errorf("用户名称不能为空")
	}
	if len(user.Name) > 30 {
		return fmt.Errorf("用户名称太长")
	}
	if len(user.Password) < 1 {
		return fmt.Errorf("用户密码不能为空")
	}
	if len(user.Password) > 30 {
		return fmt.Errorf("用户密码太长")
	}
	if user.Password != util.StandardizeString(user.Password) {
		return fmt.Errorf("密码格式不正确")
	}
	if len(user.Header) > 10240 {
		return fmt.Errorf("头像图片太大")
	}
	if len(user.Header) < 1 {
		user.Header = common.UserDefaultHeader
	}
	users, err := dal.QueryUser(ctx, &model.User{Name: user.Name})
	if util.LogIfErr(err) {
		return err
	}
	if len(users) > 0 && users[0].ID != user.ID {
		return fmt.Errorf("用户名称%s已存在", user.Name)
	}
	return config.Transaction(ctx, func(ctx context.Context) error {
		return dal.SaveUser(ctx, user)
	})
}

func GetUserByName(ctx context.Context, name string) (*model.User, error) {
	if len(name) < 1 {
		return nil, fmt.Errorf("用户名称不能为空")
	}
	users, err := dal.QueryUser(ctx, &model.User{Name: name})
	if util.LogIfErr(err) {
		return nil, fmt.Errorf("获取用户失败")
	}
	if len(users) < 1 {
		return nil, fmt.Errorf("用户%s不存在", name)
	}
	return users[0], nil
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
