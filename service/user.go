package service

import (
	"context"
	"github.com/canuran/go-home/comm"
	"github.com/canuran/go-home/comm/consts"
	"github.com/canuran/go-home/comm/errorer"
	"github.com/canuran/go-home/config"
	"github.com/canuran/go-home/dal"
	"github.com/canuran/go-home/generate/model"
	"github.com/canuran/go-home/utils/codec"
	"github.com/canuran/go-home/utils/stringer"
	"github.com/patrickmn/go-cache"
	"github.com/sirupsen/logrus"
	"log"
	"strconv"
	"strings"
	"time"
)

const (
	MaxHeaderSize = 5120
)

var (
	authUserCache = cache.New(time.Minute, time.Minute)
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
	user.Name = stringer.FormatSpaceString(user.Name)
	log.Printf("SaveUser:id=%d,name=%s", user.ID, user.Name)
	if len(user.Name) < 1 {
		return errorer.Format("用户名不能为空")
	}
	if len(user.Name) > 32 {
		return errorer.Format("用户名太长")
	}
	if len(user.Password) > 32 {
		return errorer.Format("用户密码太长")
	}
	if user.Password != stringer.FormatSpaceString(user.Password) {
		return errorer.Format("密码格式不正确")
	}
	// 很小的头像先放库里存着，有条件再升级
	if len(user.Header) > MaxHeaderSize {
		return errorer.Format("头像图片太大")
	}

	// 业务逻辑
	option := dal.SaveUserParam{}
	existsUser, err := GetUserByName(ctx, user.Name)
	if errorer.HandlerError(err) {
		return err
	}

	if user.ID > 0 {
		// 更新用户
		oldUser, err := GetUserById(ctx, user.ID)
		if errorer.HandlerError(err) {
			return err
		}
		if oldUser == nil {
			return errorer.Format("用户%d不存在", user.ID)
		}
		if existsUser != nil && existsUser.ID != user.ID {
			return errorer.Format("用户名%s已存在", user.Name)
		}
		if len(user.Password) > 0 {
			user.Password = codec.Md5String([]byte(strings.Repeat(user.Password, 8)))
		}
		option.OmitHeader = len(user.Header) < 1
		option.OmitPassword = len(user.Password) < 1
		option.OmitAuthVersion = true
	} else {
		// 新增用户
		if existsUser != nil {
			return errorer.Format("用户名%s已存在", user.Name)
		}
		if len(user.Header) < 1 {
			user.Header = consts.DefaultHeader
		}
		if len(user.Password) < 1 {
			return errorer.Format("用户密码不能为空")
		} else {
			user.Password = codec.Md5String([]byte(strings.Repeat(user.Password, 8)))
		}
	}

	return dal.SaveUser(ctx, UserBO2DO(user), option)
}

func GetUserById(ctx context.Context, id int64) (*UserBO, error) {
	if id < 1 {
		return nil, nil
	}
	userPo, err := dal.QueryFirstUser(ctx, &dal.QueryUserParam{IdEq: id})
	return UserDO2BO(userPo), err
}

func GetUserByName(ctx context.Context, name string) (*UserBO, error) {
	if len(name) < 1 {
		return nil, nil
	}
	userPo, err := dal.QueryFirstUser(ctx, &dal.QueryUserParam{NameEq: name})
	return UserDO2BO(userPo), err
}

func QueryUser(ctx context.Context, user *dal.QueryUserParam) ([]*UserBO, error) {
	userPos, _, err := dal.QueryUserPage(ctx, user)
	userBos := make([]*UserBO, 0, len(userPos))
	for _, po := range userPos {
		userBos = append(userBos, UserDO2BO(po))
	}
	return userBos, err
}

func CountUser(ctx context.Context, user *dal.QueryUserParam) (int64, error) {
	user.Pager = &comm.Pager{GetCount: true}
	_, count, err := dal.QueryUserPage(ctx, user)
	return count, err
}

func DeleteUser(ctx context.Context, user *UserBO) error {
	return dal.DeleteUser(ctx, UserBO2DO(user))
}

func UpdateLoginIndex(ctx context.Context, user *UserBO) error {
	if user == nil || user.ID < 0 {
		return nil
	}
	authUserCache.Delete(strconv.FormatInt(user.ID, 10))
	return dal.UpdateAuthVersion(ctx, UserBO2DO(user))
}

func ValidateUser(ctx context.Context, tokenStr string) *UserBO {
	if len(tokenStr) < 1 {
		logrus.Error("验证Token为空")
		return nil
	}

	// 解析JWT
	claims, err := codec.ParseToken(tokenStr, config.JwtSecret)
	if errorer.HandlerError(err) || len(claims.Name) < 1 {
		return nil
	}

	// 用户信息缓存（需要强一致性则使用redis缓存）
	var user *UserBO
	userIdStr := strconv.FormatInt(claims.UID, 10)
	cacheUser, ok := authUserCache.Get(userIdStr)
	if ok {
		user = cacheUser.(*UserBO)
	} else {
		user, err = GetUserById(ctx, claims.UID)
		if errorer.HandlerError(err) {
			return nil
		}
		authUserCache.SetDefault(userIdStr, user)
	}

	// 验证登录版本是否失效
	if user == nil || claims.Version < user.AuthVersion {
		logrus.Error("用户登录信息无效")
		return nil
	}
	user.Password = ""
	return user
}
