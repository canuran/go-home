package service

import (
	"context"
	"github.com/ewingtsai/go-web/common"
	"github.com/ewingtsai/go-web/common/consts"
	"github.com/ewingtsai/go-web/common/showerr"
	"github.com/ewingtsai/go-web/generate/model"
	"github.com/ewingtsai/go-web/repo"
	"github.com/ewingtsai/go-web/utils/encoders"
	"github.com/ewingtsai/go-web/utils/errorer"
	"github.com/ewingtsai/go-web/utils/stringer"
	log "github.com/sirupsen/logrus"
	"strings"
	"time"

	"github.com/ewingtsai/go-web/config"
)

const (
	MaxHeaderSize = 5120
)

type UserBO struct {
	ID       int64  `json:"id,omitempty"`
	Name     string `json:"name,omitempty"`
	Password string `json:"password,omitempty"`
	// Header 很小的头像先放库里存着，有条件再升级
	Header      string    `json:"header,omitempty"`
	Gender      string    `json:"gender,omitempty"`
	Role        string    `json:"role,omitempty"`
	Status      int64     `json:"status,omitempty"`
	Sign        string    `json:"sign,omitempty"`
	AuthVersion int64     `json:"auth_version"`
	UpdatedAt   time.Time `json:"updated_at,omitempty"`
}

func UserBO2DO(user *UserBO) *model.User {
	if user == nil {
		return nil
	}
	return &model.User{
		ID:          user.ID,
		Name:        user.Name,
		Password:    user.Password,
		Header:      user.Header,
		Gender:      user.Gender,
		Role:        user.Role,
		Status:      user.Status,
		AuthVersion: user.AuthVersion,
		Sign:        user.Sign,
	}
}

func UserDO2BO(user *model.User) *UserBO {
	if user == nil {
		return nil
	}
	return &UserBO{
		ID:          user.ID,
		Name:        user.Name,
		Password:    user.Password,
		Header:      user.Header,
		Gender:      user.Gender,
		Role:        user.Role,
		Status:      user.Status,
		AuthVersion: user.AuthVersion,
		Sign:        user.Sign,
		UpdatedAt:   user.UpdatedAt,
	}
}

func SaveUser(ctx context.Context, user *UserBO) error {
	if user == nil {
		return nil
	}
	// 参数校验
	user.Name = stringer.StandardizeString(user.Name)
	log.Printf("SaveUser:id=%d,name=%s", user.ID, user.Name)
	if len(user.Name) < 1 {
		return showerr.Format("用户名不能为空")
	}
	if len(user.Name) > 32 {
		return showerr.Format("用户名太长")
	}
	if len(user.Password) > 32 {
		return showerr.Format("用户密码太长")
	}
	if user.Password != stringer.StandardizeString(user.Password) {
		return showerr.Format("密码格式不正确")
	}
	// 很小的头像先放库里存着，有条件再升级
	if len(user.Header) > 5120 {
		return showerr.Format("头像图片太大")
	}

	// 业务逻辑
	option := repo.SaveOption{}
	existsUser, err := GetUserByName(ctx, user.Name)
	if errorer.LogIfErr(err) {
		return err
	}

	if user.ID > 0 {
		// 更新用户
		oldUser, err := GetUserById(ctx, user.ID)
		if errorer.LogIfErr(err) {
			return err
		}
		if oldUser == nil {
			return showerr.Format("用户%d不存在", user.ID)
		}
		if existsUser != nil && existsUser.ID != user.ID {
			return showerr.Format("用户名%s已存在", user.Name)
		}
		if len(user.Password) > 0 {
			user.Password = encoders.Md5String([]byte(strings.Repeat(user.Password, 8)))
		}
		option.OmitHeader = len(user.Header) < 1
		option.OmitPassword = len(user.Password) < 1
		option.OmitAuthVersion = true
	} else {
		// 新增用户
		if existsUser != nil {
			return showerr.Format("用户名%s已存在", user.Name)
		}
		if len(user.Header) < 1 {
			user.Header = consts.DefaultHeader
		}
		if len(user.Password) < 1 {
			return showerr.Format("用户密码不能为空")
		} else {
			user.Password = encoders.Md5String([]byte(strings.Repeat(user.Password, 8)))
		}
	}

	return config.Transaction(ctx, func(ctx context.Context) error {
		return repo.SaveUser(ctx, UserBO2DO(user), option)
	})
}

func GetUserById(ctx context.Context, id int64) (*UserBO, error) {
	if id < 1 {
		return nil, nil
	}
	userPo, err := repo.QueryFirstUser(ctx, repo.QueryOption{IdEq: id})
	return UserDO2BO(userPo), err
}

func GetUserByName(ctx context.Context, name string) (*UserBO, error) {
	if len(name) < 1 {
		return nil, nil
	}
	userPo, err := repo.QueryFirstUser(ctx, repo.QueryOption{NameEq: name})
	return UserDO2BO(userPo), err
}

func QueryUser(ctx context.Context, user *UserBO, offset, limit int) ([]*UserBO, error) {
	userPos, _, err := repo.QueryUserPage(ctx, repo.QueryOption{
		IdEq:          user.ID,
		NameStartWith: user.Name,
		GenderEq:      user.Gender,
		StatusEq:      user.Status,
		OmitPassword:  true,
	}, common.Pager{Offset: offset,
		Limit:   limit,
		GetRows: true})
	userBos := make([]*UserBO, 0, len(userPos))
	for _, po := range userPos {
		userBos = append(userBos, UserDO2BO(po))
	}
	return userBos, err
}

func CountUser(ctx context.Context, user *UserBO) (int64, error) {
	_, count, err := repo.QueryUserPage(ctx, repo.QueryOption{
		IdEq:          user.ID,
		NameStartWith: user.Name,
		GenderEq:      user.Gender,
		StatusEq:      user.Status,
	}, common.Pager{GetCount: true})
	return count, err
}

func DeleteUser(ctx context.Context, user *UserBO) error {
	return repo.DeleteUser(ctx, UserBO2DO(user))
}

func UpdateLoginIndex(ctx context.Context, user *UserBO) error {
	if user == nil || user.ID < 0 {
		return nil
	}
	return repo.UpdateAuthVersion(ctx, UserBO2DO(user))
}
