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

const (
	MaxHeaderSize = 5120
)

func SaveUser(ctx context.Context, user *model.User) error {
	if user == nil {
		return nil
	}
	user.Name = util.StandardizeString(user.Name)
	log.Printf("SaveUser:id=%d,name=%s", user.ID, user.Name)
	if len(user.Name) < 1 {
		return fmt.Errorf("用户名不能为空")
	}
	if len(user.Name) > 32 {
		return fmt.Errorf("用户名太长")
	}
	if len(user.Password) > 32 {
		return fmt.Errorf("用户密码太长")
	}
	if user.Password != util.StandardizeString(user.Password) {
		return fmt.Errorf("密码格式不正确")
	}
	if len(user.Header) > 5120 {
		return fmt.Errorf("头像图片太大")
	}

	users, err := dal.QueryUser(ctx, &dal.UserParam{Entity: &model.User{Name: user.Name}})
	if util.LogIfErr(err) {
		return err
	}

	userParam := &dal.UserParam{Entity: user}
	userParam.OmitFields = append(userParam.OmitFields, "login_version")
	if len(users) > 0 {
		// 修改用户
		existUser := users[0]
		if existUser.ID != user.ID {
			return fmt.Errorf("用户名%s已存在", user.Name)
		}
		if len(user.Header) < 1 {
			userParam.OmitFields = append(userParam.OmitFields, "header")
		}
		if len(user.Password) < 1 {
			userParam.OmitFields = append(userParam.OmitFields, "password")
		} else {
			user.Password = util.Md5String([]byte(user.Name + user.Password))
		}
	} else {
		// 新增用户
		if len(user.Header) < 1 {
			user.Header = common.UserDefaultHeader
		}
		if len(user.Password) < 1 {
			return fmt.Errorf("用户密码不能为空")
		} else {
			user.Password = util.Md5String([]byte(user.Name + user.Password))
		}
	}

	return config.Transaction(ctx, func(ctx context.Context) error {
		return dal.SaveUser(ctx, userParam)
	})
}

func GetUserByName(ctx context.Context, name string) (*model.User, error) {
	if len(name) < 1 {
		return nil, fmt.Errorf("用户名不能为空")
	}
	users, err := dal.QueryUser(ctx, &dal.UserParam{Entity: &model.User{Name: name}})
	if util.LogIfErr(err) {
		return nil, fmt.Errorf("获取用户失败")
	}
	if len(users) < 1 {
		return nil, fmt.Errorf("用户%s不存在", name)
	}
	return users[0], nil
}

func QueryUser(ctx context.Context, user *model.User, offset, limit int) ([]*model.User, error) {
	return dal.QueryUser(ctx, &dal.UserParam{Entity: user, Offset: offset, Limit: limit,
		OmitFields: []string{"password"}})
}

func CountUser(ctx context.Context, user *model.User) (int64, error) {
	return dal.CountUser(ctx, &dal.UserParam{Entity: user})
}

func DeleteUser(ctx context.Context, user *model.User) error {
	return dal.DeleteUser(ctx, user)
}

func UpdateLoginIndex(ctx context.Context, user *model.User) error {
	if user == nil || user.ID < 0 {
		return nil
	}
	return dal.SaveUser(ctx, &dal.UserParam{
		Entity:       &model.User{ID: user.ID, LoginVersion: user.LoginVersion},
		SelectFields: []string{"id", "login_version"},
	})
}
