package dal

import (
	"context"
	"github.com/canuran/go-home/comm"
	"github.com/canuran/go-home/config"
	"github.com/canuran/go-home/generate/model"
	"github.com/canuran/go-home/generate/query"
	"github.com/canuran/go-home/utils/stringer"
	"github.com/canuran/go-home/utils/valuer"
	"gorm.io/gen"
	"gorm.io/gen/field"
	"strings"
)

type SaveUserParam struct {
	OmitHeader        bool
	OmitPassword      bool
	OmitAuthVersion   bool
	SelectAuthVersion bool
}

type QueryUserParam struct {
	IdEq         int64
	NameEq       string
	GenderEq     string
	StatusEq     int64
	OmitHeader   bool
	OmitPassword bool
	Conditions   []*comm.Condition
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

func QueryUserPage(ctx context.Context, param *QueryUserParam, pager comm.Pager) ([]*model.User, int64, error) {
	db, ctx := config.GetDB(ctx)
	u := query.Use(db).User
	dao := u.Scopes(queryUserScope(param), comm.PageScope(pager))

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

		where := u.Where()
		if param.IdEq > 0 {
			where = where.Where(u.ID.Eq(param.IdEq))
		}
		if len(param.NameEq) > 0 {
			where = where.Where(u.Name.Eq(param.NameEq))
		}
		if len(param.GenderEq) > 0 {
			where = where.Where(u.Gender.Eq(param.GenderEq))
		}
		if param.StatusEq > 0 {
			where = where.Where(u.Status.Eq(param.StatusEq))
		}
		return dao.Where(queryUserConditions(where, param.Conditions))
	}
}

func queryUserConditions(prev gen.Condition, conditions []*comm.Condition) gen.Condition {
	u := query.Q.User
	orCond := u.Where()
	for _, condition := range conditions {
		var cond gen.Condition
		switch condition.Name {
		case "id_in":
			cond = u.ID.In(valuer.Int64Slice([]rune(condition.Value))...)
		case "id_gt":
			cond = u.ID.Gt(valuer.Int64ify(condition.Value))
		case "id_lt":
			cond = u.ID.Lt(valuer.Int64ify(condition.Value))
		case "name_in":
			cond = u.Name.In(strings.Split(condition.Value, ",")...)
		case "name_contain":
			cond = u.Name.Like("%" + stringer.EscapeSqlLike(condition.Value) + "%")
		case "name_gt":
			cond = u.Name.Gt(condition.Value)
		case "name_lt":
			cond = u.Name.Lt(condition.Value)
		case "gender_male":
			cond = u.Gender.Eq("男")
		case "gender_female":
			cond = u.Gender.Eq("女")
		case "gender_secret":
			cond = u.Gender.Eq("保密")
		default:
			continue
		}
		cond = queryUserConditions(cond, condition.Children)
		// and条件优先，直接连接，or条件暂存至prev
		if condition.Type == "or" {
			orCond = u.Where(orCond).Or(prev)
			prev = cond
		} else {
			prev = u.Where(prev).Where(cond)
		}
	}
	orCond = u.Where(orCond).Or(prev)
	return orCond
}

func QueryFirstUser(ctx context.Context, param *QueryUserParam) (*model.User, error) {
	users, _, err := QueryUserPage(ctx, param,
		comm.Pager{Limit: 1, GetRows: true})
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
