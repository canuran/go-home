package dal

import (
	"context"
	"github.com/canuran/go-home/comm"
	"github.com/canuran/go-home/config"
	"github.com/canuran/go-home/generate/model"
	"github.com/canuran/go-home/generate/query"
	"gorm.io/gen"
	"gorm.io/gen/field"
)

type SaveUserParam struct {
	OmitHeader        bool
	OmitPassword      bool
	OmitAuthVersion   bool
	SelectAuthVersion bool
}

type QueryUserParam struct {
	*comm.Pager
	IdEq         int64
	IdGt         int64
	IdLt         int64
	NameEq       string
	GenderEq     string
	StatusEq     int64
	OmitHeader   bool
	OmitPassword bool
}

func UpdateAuthVersion(ctx context.Context, user *model.User) error {
	db, ctx := config.GetDB(ctx)
	u := query.Use(db).User
	_, err := u.Where(u.ID.Eq(user.ID)).
		Update(u.AuthVersion, user.AuthVersion)
	return err
}

func SaveUser(ctx context.Context, user *model.User, param SaveUserParam) error {
	db, ctx := config.GetDB(ctx)
	u := query.Use(db).User

	err := u.Scopes(saveUserScope(param)).
		Clauses(config.ConflictUpdateAll).
		Save(user)
	return err
}

func saveUserScope(param SaveUserParam) func(gen.Dao) gen.Dao {
	return func(dao gen.Dao) gen.Dao {
		u := query.Q.User
		var omitFields []field.Expr
		if param.OmitHeader {
			omitFields = append(omitFields, u.Header)
		}
		if param.OmitPassword {
			omitFields = append(omitFields, u.Password)
		}
		if param.OmitAuthVersion {
			omitFields = append(omitFields, u.AuthVersion)
		}

		var selectFields []field.Expr
		if param.SelectAuthVersion {
			selectFields = append(selectFields, u.AuthVersion)
		}
		return dao.Select(selectFields...).
			Omit(omitFields...)
	}
}

func QueryUserPage(ctx context.Context, param *QueryUserParam) ([]*model.User, int64, error) {
	db, ctx := config.GetDB(ctx)
	u := query.Use(db).User
	dao := u.Scopes(queryUserScope(param), comm.PageScope(param.Pager))

	var err error
	var count int64
	var data []*model.User
	if param.Pager != nil && param.Pager.GetCount {
		count, err = dao.Count()
		if err != nil {
			return data, count, err
		}
	}

	if param.Pager != nil && param.Pager.GetRows &&
		(!param.Pager.GetCount || count > 0) {
		data, err = dao.Find()
		if err != nil {
			return data, count, err
		}
	}
	return data, count, err
}

func queryUserScope(param *QueryUserParam) func(gen.Dao) gen.Dao {
	return func(dao gen.Dao) gen.Dao {
		u := query.Q.User
		var omitFields []field.Expr
		if param.OmitHeader {
			omitFields = append(omitFields, u.Header)
		}
		if param.OmitPassword {
			omitFields = append(omitFields, u.Password)
		}
		dao = dao.Omit(omitFields...)

		if param.IdEq > 0 {
			dao = dao.Where(u.ID.Eq(param.IdEq))
		}
		if param.IdGt > 0 {
			dao = dao.Where(u.ID.Gt(param.IdGt))
		}
		if param.IdLt > 0 {
			dao = dao.Where(u.ID.Lt(param.IdLt))
		}
		if len(param.NameEq) > 0 {
			dao = dao.Where(u.Name.Eq(param.NameEq))
		}
		if len(param.GenderEq) > 0 {
			dao = dao.Where(u.Gender.Eq(param.GenderEq))
		}
		if param.StatusEq > 0 {
			dao = dao.Where(u.Status.Eq(param.StatusEq))
		}
		return dao
	}
}

func QueryFirstUser(ctx context.Context, param *QueryUserParam) (*model.User, error) {
	param.Pager = &comm.Pager{Limit: 1, GetRows: true}
	users, _, err := QueryUserPage(ctx, param)
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
