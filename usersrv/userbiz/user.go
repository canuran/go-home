package userbiz

import (
	"context"
	"fmt"
	"github.com/ewingtsai/go-web/utils/encoders"
	"github.com/ewingtsai/go-web/utils/strutil"
	"log"
	"strings"
	"time"

	"github.com/ewingtsai/go-web/common"

	"github.com/ewingtsai/go-web/config"
	"github.com/ewingtsai/go-web/usersrv/userdal"
)

const (
	MaxHeaderSize = 5120
)

type UserBO struct {
	ID           int64     `json:"id,omitempty"`
	Name         string    `json:"name,omitempty"`
	Password     string    `json:"password,omitempty"`
	Header       string    `json:"header,omitempty"` // 存储很小的头像
	Gender       string    `json:"gender,omitempty"`
	Role         string    `json:"role,omitempty"`
	Status       int       `json:"status,omitempty"`
	Sign         string    `json:"sign,omitempty"`
	LoginVersion int64     `json:"login_version"`
	UpdatedAt    time.Time `json:"updated_at,omitempty"`
}

func UserBO2PO(bo *UserBO) *userdal.UserPO {
	if bo == nil {
		return nil
	}
	return &userdal.UserPO{
		ID:           bo.ID,
		Name:         bo.Name,
		Password:     bo.Password,
		Header:       bo.Header,
		Gender:       bo.Gender,
		Role:         bo.Role,
		Status:       bo.Status,
		LoginVersion: bo.LoginVersion,
		Sign:         bo.Sign,
	}
}

func UserPO2BO(po *userdal.UserPO) *UserBO {
	if po == nil {
		return nil
	}
	return &UserBO{
		ID:           po.ID,
		Name:         po.Name,
		Password:     po.Password,
		Header:       po.Header,
		Gender:       po.Gender,
		Role:         po.Role,
		Status:       po.Status,
		LoginVersion: po.LoginVersion,
		Sign:         po.Sign,
		UpdatedAt:    po.UpdatedAt,
	}
}

func SaveUser(ctx context.Context, user *UserBO) error {
	if user == nil {
		return nil
	}
	// 参数校验
	user.Name = strutil.StandardizeString(user.Name)
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
	if user.Password != strutil.StandardizeString(user.Password) {
		return fmt.Errorf("密码格式不正确")
	}
	if len(user.Header) > 5120 {
		return fmt.Errorf("头像图片太大")
	}

	// 业务逻辑
	userParam := &userdal.UserParam{Entity: UserBO2PO(user)}
	userParam.OmitFields = append(userParam.OmitFields, "login_version")
	existsUser, err := GetUserByName(ctx, user.Name)
	if common.LogIfErr(err) {
		return err
	}

	if user.ID > 0 {
		// 更新用户
		oldUser, err := GetUserById(ctx, user.ID)
		if common.LogIfErr(err) {
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
			user.Password = encoders.Md5String([]byte(strings.Repeat(user.Password, 8)))
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
			user.Password = encoders.Md5String([]byte(strings.Repeat(user.Password, 8)))
		}
	}

	return config.Transaction(ctx, func(ctx context.Context) error {
		return userdal.SaveUser(ctx, userParam)
	})
}

func GetUserById(ctx context.Context, id int64) (*UserBO, error) {
	if id < 1 {
		return nil, nil
	}
	userPo, err := userdal.QueryFirstUser(ctx,
		&userdal.UserParam{Entity: &userdal.UserPO{ID: id}})
	return UserPO2BO(userPo), err
}

func GetUserByName(ctx context.Context, name string) (*UserBO, error) {
	if len(name) < 1 {
		return nil, nil
	}
	userPo, err := userdal.QueryFirstUser(ctx,
		&userdal.UserParam{Entity: &userdal.UserPO{Name: name}})
	return UserPO2BO(userPo), err
}

func QueryUser(ctx context.Context, user *UserBO, offset, limit int) ([]*UserBO, error) {
	var userBos []*UserBO
	userPos, err := userdal.QueryUser(ctx,
		&userdal.UserParam{Entity: UserBO2PO(user),
			Offset:     offset,
			Limit:      limit,
			OmitFields: []string{"password"}})
	for _, po := range userPos {
		userBos = append(userBos, UserPO2BO(po))
	}
	return userBos, err
}

func CountUser(ctx context.Context, user *UserBO) (int64, error) {
	return userdal.CountUser(ctx,
		&userdal.UserParam{Entity: UserBO2PO(user)})
}

func DeleteUser(ctx context.Context, user *UserBO) error {
	return userdal.DeleteUser(ctx, UserBO2PO(user))
}

func UpdateLoginIndex(ctx context.Context, user *UserBO) error {
	if user == nil || user.ID < 0 {
		return nil
	}
	return userdal.SaveUser(ctx, &userdal.UserParam{
		Entity:       &userdal.UserPO{ID: user.ID, LoginVersion: user.LoginVersion},
		SelectFields: []string{"id", "login_version"},
	})
}
