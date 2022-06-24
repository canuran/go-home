package repo

import (
	"context"
	"github.com/ewingtsai/go-home/common"
	"github.com/ewingtsai/go-home/config"
	"github.com/ewingtsai/go-home/generate/model"
	"github.com/ewingtsai/go-home/generate/query"
	"github.com/ewingtsai/go-home/utils/stringer"
	"gorm.io/gen"
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
	db, ctx := config.GetDB(ctx)
	u := query.Use(db).User
	_, err := u.Where(u.ID.Eq(user.ID)).
		Update(u.AuthVersion, user.AuthVersion)
	return err
}

func SaveUser(ctx context.Context, user *model.User, option SaveOption) error {
	db, ctx := config.GetDB(ctx)
	u := query.Use(db).User

	err := u.Scopes(saveUserScope(option)).
		Clauses(config.ConflictUpdateAll).
		Save(user)
	return err
}

func saveUserScope(option SaveOption) func(gen.Dao) gen.Dao {
	return func(dao gen.Dao) gen.Dao {
		u := query.Q.User
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
		return dao.Select(selectFields...).
			Omit(omitFields...)
	}
}

func QueryUserPage(ctx context.Context, option QueryOption, pager common.Pager) ([]*model.User, int64, error) {
	db, ctx := config.GetDB(ctx)
	u := query.Use(db).User
	dao := u.Scopes(queryUserScope(option), common.PageScope(pager))

	var err error
	var count int64
	var data []*model.User
	if pager.GetCount {
		count, err = dao.Count()
		if err != nil {
			return data, count, err
		}
	}

	if pager.GetRows && (!pager.GetCount || count > 0) {
		data, err = dao.Find()
		if err != nil {
			return data, count, err
		}
	}
	return data, count, err
}

func queryUserScope(option QueryOption) func(gen.Dao) gen.Dao {
	return func(dao gen.Dao) gen.Dao {
		u := query.Q.User
		var omitFields []field.Expr
		if option.OmitHeader {
			omitFields = append(omitFields, u.Header)
		}
		if option.OmitPassword {
			omitFields = append(omitFields, u.Password)
		}
		dao = dao.Omit(omitFields...)

		if option.IdEq > 0 {
			dao = dao.Where(u.ID.Eq(option.IdEq))
		}
		if len(option.NameEq) > 0 {
			dao = dao.Where(u.Name.Eq(option.NameEq))
		}
		if len(option.NameStartWith) > 0 {
			dao = dao.Where(u.Name.Like(stringer.EscapeSqlLike(option.NameStartWith) + "%"))
		}
		if len(option.GenderEq) > 0 {
			dao = dao.Where(u.Gender.Eq(option.GenderEq))
		}
		if option.StatusEq > 0 {
			dao = dao.Where(u.Status.Eq(option.StatusEq))
		}
		return dao
	}
}

func QueryFirstUser(ctx context.Context, option QueryOption) (*model.User, error) {
	users, _, err := QueryUserPage(ctx, option,
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
	db, ctx := config.GetDB(ctx)
	u := query.Use(db).User
	_, err := u.Where(u.ID.Eq(user.ID)).Delete()
	return err
}
