package userdal

import (
	"context"
	"github.com/ewingtsai/go-web/common"
	"github.com/ewingtsai/go-web/config"
	"github.com/ewingtsai/go-web/generate/gormgen/model"
	"github.com/ewingtsai/go-web/generate/gormgen/query"
	"github.com/ewingtsai/go-web/utils/converter"
	"gorm.io/gen/field"
)

type SaveOption struct {
	OmitHeader        bool
	OmitPassword      bool
	OmitAuthVersion   bool
	SelectAuthVersion bool
}

type QueryOption struct {
	IdEq          int64
	NameEq        string
	NameStartWith string
	GenderEq      string
	StatusEq      int64
	OmitHeader    bool
	OmitPassword  bool
}

func UpdateAuthVersion(ctx context.Context, user *model.User) error {
	db := config.GetDB(ctx)
	u := query.Use(db).User
	_, err := u.Where(u.ID.Eq(user.ID)).
		Update(u.AuthVersion, u.AuthVersion)
	return err
}

func SaveUser(ctx context.Context, user *model.User, option SaveOption) error {
	db := config.GetDB(ctx)
	u := query.Use(db).User

	var omitFields []field.Expr
	if option.OmitHeader {
		omitFields = append(omitFields, u.Header)
	}
	if option.OmitPassword {
		omitFields = append(omitFields, u.Password)
	}
	if option.OmitAuthVersion {
		omitFields = append(omitFields, u.AuthVersion)
	}

	var selectFields []field.Expr
	if option.SelectAuthVersion {
		selectFields = append(selectFields, u.AuthVersion)
	}

	err := u.Select(selectFields...).
		Omit(omitFields...).
		Clauses(config.ConflictUpdateAll).
		Save(user)
	return err
}

func QueryUser(ctx context.Context, option QueryOption, pager common.Pager) ([]*model.User, int64, error) {
	db := config.GetDB(ctx)
	u := query.Use(db).User

	var omitFields []field.Expr
	if option.OmitHeader {
		omitFields = append(omitFields, u.Header)
	}
	if option.OmitPassword {
		omitFields = append(omitFields, u.Password)
	}
	udo := u.Omit(omitFields...)

	if option.IdEq > 0 {
		udo = udo.Where(u.ID.Eq(option.IdEq))
	}
	if len(option.NameEq) > 0 {
		udo = udo.Where(u.Name.Eq(option.NameEq))
	}
	nameStartWith := converter.RemoveSqlWildcard(option.NameStartWith)
	if len(nameStartWith) > 0 {
		udo = udo.Where(u.Name.Like(nameStartWith + "%"))
	}
	if len(option.GenderEq) > 0 {
		udo = udo.Where(u.Gender.Eq(option.GenderEq))
	}
	if option.StatusEq > 0 {
		udo = udo.Where(u.Status.Eq(option.StatusEq))
	}

	var err error
	var count int64
	var data []*model.User
	if pager.GetCount {
		count, err = udo.Count()
		if err != nil {
			return data, count, err
		}
	}
	if pager.GetRows && (!pager.GetCount || count > 0) {
		data, err = udo.Find()
		if err != nil {
			return data, count, err
		}
	}
	return data, count, err
}

func QueryFirstUser(ctx context.Context, option QueryOption) (*model.User, error) {
	users, _, err := QueryUser(ctx, option,
		common.Pager{Limit: 1, GetRows: true})
	if len(users) > 0 {
		return users[0], err
	}
	return nil, err
}

func DeleteUser(ctx context.Context, user *model.User) error {
	if user == nil || user.ID < 1 {
		return nil
	}
	db := config.GetDB(ctx)
	u := query.Use(db).User
	_, err := u.Where(u.ID.Eq(user.ID)).Delete()
	return err
}
