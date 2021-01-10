package service

import (
	"context"
	"fmt"
	"log"
	"strings"

	"github.com/ewingtsai/go-web/common"

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
	// 参数校验
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

	// 业务逻辑
	userParam := &dal.UserParam{Entity: user}
	userParam.OmitFields = append(userParam.OmitFields, "login_version")
	existsUser, err := GetUserByName(ctx, user.Name)
	if util.LogIfErr(err) {
		return err
	}

	if user.ID > 0 {
		// 更新用户
		oldUser, err := GetUserById(ctx, user.ID)
		if util.LogIfErr(err) {
			return err
		}
		if oldUser == nil {
			return fmt.Errorf("用户%d不存在", user.ID)
		}
		if existsUser != nil && existsUser.ID != user.ID {
			return fmt.Errorf("用户名%s已存在", user.Name)
		}
		if len(user.Header) < 1 {
			userParam.OmitFields = append(userParam.OmitFields, "header")
		}
		if len(user.Password) < 1 {
			userParam.OmitFields = append(userParam.OmitFields, "password")
		} else {
			user.Password = util.Md5String([]byte(strings.Repeat(user.Password, 8)))
		}
	} else {
		// 新增用户
		if existsUser != nil {
			return fmt.Errorf("用户名%s已存在", user.Name)
		}
		if len(user.Header) < 1 {
			user.Header = common.UserDefaultHeader
		}
		if len(user.Password) < 1 {
			return fmt.Errorf("用户密码不能为空")
		} else {
			user.Password = util.Md5String([]byte(strings.Repeat(user.Password, 8)))
		}
	}

	return config.Transaction(ctx, func(ctx context.Context) error {
		return dal.SaveUser(ctx, userParam)
	})
}

func GetUserById(ctx context.Context, id int64) (*model.User, error) {
	if id < 1 {
		return nil, nil
	}
	return dal.QueryFirstUser(ctx, &dal.UserParam{Entity: &model.User{ID: id}})
}

func GetUserByName(ctx context.Context, name string) (*model.User, error) {
	if len(name) < 1 {
		return nil, nil
	}
	return dal.QueryFirstUser(ctx, &dal.UserParam{Entity: &model.User{Name: name}})
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
