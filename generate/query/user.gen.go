// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.

package query

import (
	"context"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	"gorm.io/gorm/schema"

	"gorm.io/gen"
	"gorm.io/gen/field"

	"github.com/ewingtsai/go-home/generate/model"
)

func newUser(db *gorm.DB) user {
	_user := user{}

	_user.userDo.UseDB(db)
	_user.userDo.UseModel(&model.User{})

	tableName := _user.userDo.TableName()
	_user.ALL = field.NewField(tableName, "*")
	_user.ID = field.NewInt64(tableName, "id")
	_user.Name = field.NewString(tableName, "name")
	_user.Password = field.NewString(tableName, "password")
	_user.Header = field.NewString(tableName, "header")
	_user.Gender = field.NewString(tableName, "gender")
	_user.Role = field.NewString(tableName, "role")
	_user.Status = field.NewInt64(tableName, "status")
	_user.AuthVersion = field.NewInt64(tableName, "auth_version")
	_user.Sign = field.NewString(tableName, "sign")
	_user.CreatedAt = field.NewTime(tableName, "created_at")
	_user.UpdatedAt = field.NewTime(tableName, "updated_at")

	_user.fillFieldMap()

	return _user
}

type user struct {
	userDo

	ALL         field.Field
	ID          field.Int64
	Name        field.String
	Password    field.String
	Header      field.String
	Gender      field.String
	Role        field.String
	Status      field.Int64
	AuthVersion field.Int64
	Sign        field.String
	CreatedAt   field.Time
	UpdatedAt   field.Time

	fieldMap map[string]field.Expr
}

func (u user) Table(newTableName string) *user {
	u.userDo.UseTable(newTableName)
	return u.updateTableName(newTableName)
}

func (u user) As(alias string) *user {
	u.userDo.DO = *(u.userDo.As(alias).(*gen.DO))
	return u.updateTableName(alias)
}

func (u *user) updateTableName(table string) *user {
	u.ALL = field.NewField(table, "*")
	u.ID = field.NewInt64(table, "id")
	u.Name = field.NewString(table, "name")
	u.Password = field.NewString(table, "password")
	u.Header = field.NewString(table, "header")
	u.Gender = field.NewString(table, "gender")
	u.Role = field.NewString(table, "role")
	u.Status = field.NewInt64(table, "status")
	u.AuthVersion = field.NewInt64(table, "auth_version")
	u.Sign = field.NewString(table, "sign")
	u.CreatedAt = field.NewTime(table, "created_at")
	u.UpdatedAt = field.NewTime(table, "updated_at")

	u.fillFieldMap()

	return u
}

func (u *user) GetFieldByName(fieldName string) (field.OrderExpr, bool) {
	_f, ok := u.fieldMap[fieldName]
	if !ok || _f == nil {
		return nil, false
	}
	_oe, ok := _f.(field.OrderExpr)
	return _oe, ok
}

func (u *user) fillFieldMap() {
	u.fieldMap = make(map[string]field.Expr, 11)
	u.fieldMap["id"] = u.ID
	u.fieldMap["name"] = u.Name
	u.fieldMap["password"] = u.Password
	u.fieldMap["header"] = u.Header
	u.fieldMap["gender"] = u.Gender
	u.fieldMap["role"] = u.Role
	u.fieldMap["status"] = u.Status
	u.fieldMap["auth_version"] = u.AuthVersion
	u.fieldMap["sign"] = u.Sign
	u.fieldMap["created_at"] = u.CreatedAt
	u.fieldMap["updated_at"] = u.UpdatedAt
}

func (u user) clone(db *gorm.DB) user {
	u.userDo.ReplaceDB(db)
	return u
}

type userDo struct{ gen.DO }

func (u userDo) Debug() *userDo {
	return u.withDO(u.DO.Debug())
}

func (u userDo) WithContext(ctx context.Context) *userDo {
	return u.withDO(u.DO.WithContext(ctx))
}

func (u userDo) Clauses(conds ...clause.Expression) *userDo {
	return u.withDO(u.DO.Clauses(conds...))
}

func (u userDo) Returning(value interface{}, columns ...string) *userDo {
	return u.withDO(u.DO.Returning(value, columns...))
}

func (u userDo) Not(conds ...gen.Condition) *userDo {
	return u.withDO(u.DO.Not(conds...))
}

func (u userDo) Or(conds ...gen.Condition) *userDo {
	return u.withDO(u.DO.Or(conds...))
}

func (u userDo) Select(conds ...field.Expr) *userDo {
	return u.withDO(u.DO.Select(conds...))
}

func (u userDo) Where(conds ...gen.Condition) *userDo {
	return u.withDO(u.DO.Where(conds...))
}

func (u userDo) Exists(subquery interface{ UnderlyingDB() *gorm.DB }) *userDo {
	return u.Where(field.CompareSubQuery(field.ExistsOp, nil, subquery.UnderlyingDB()))
}

func (u userDo) Order(conds ...field.Expr) *userDo {
	return u.withDO(u.DO.Order(conds...))
}

func (u userDo) Distinct(cols ...field.Expr) *userDo {
	return u.withDO(u.DO.Distinct(cols...))
}

func (u userDo) Omit(cols ...field.Expr) *userDo {
	return u.withDO(u.DO.Omit(cols...))
}

func (u userDo) Join(table schema.Tabler, on ...field.Expr) *userDo {
	return u.withDO(u.DO.Join(table, on...))
}

func (u userDo) LeftJoin(table schema.Tabler, on ...field.Expr) *userDo {
	return u.withDO(u.DO.LeftJoin(table, on...))
}

func (u userDo) RightJoin(table schema.Tabler, on ...field.Expr) *userDo {
	return u.withDO(u.DO.RightJoin(table, on...))
}

func (u userDo) Group(cols ...field.Expr) *userDo {
	return u.withDO(u.DO.Group(cols...))
}

func (u userDo) Having(conds ...gen.Condition) *userDo {
	return u.withDO(u.DO.Having(conds...))
}

func (u userDo) Limit(limit int) *userDo {
	return u.withDO(u.DO.Limit(limit))
}

func (u userDo) Offset(offset int) *userDo {
	return u.withDO(u.DO.Offset(offset))
}

func (u userDo) Scopes(funcs ...func(gen.Dao) gen.Dao) *userDo {
	return u.withDO(u.DO.Scopes(funcs...))
}

func (u userDo) Unscoped() *userDo {
	return u.withDO(u.DO.Unscoped())
}

func (u userDo) Create(values ...*model.User) error {
	if len(values) == 0 {
		return nil
	}
	return u.DO.Create(values)
}

func (u userDo) CreateInBatches(values []*model.User, batchSize int) error {
	return u.DO.CreateInBatches(values, batchSize)
}

// Save : !!! underlying implementation is different with GORM
// The method is equivalent to executing the statement: db.Clauses(clause.OnConflict{UpdateAll: true}).Create(values)
func (u userDo) Save(values ...*model.User) error {
	if len(values) == 0 {
		return nil
	}
	return u.DO.Save(values)
}

func (u userDo) First() (*model.User, error) {
	if result, err := u.DO.First(); err != nil {
		return nil, err
	} else {
		return result.(*model.User), nil
	}
}

func (u userDo) Take() (*model.User, error) {
	if result, err := u.DO.Take(); err != nil {
		return nil, err
	} else {
		return result.(*model.User), nil
	}
}

func (u userDo) Last() (*model.User, error) {
	if result, err := u.DO.Last(); err != nil {
		return nil, err
	} else {
		return result.(*model.User), nil
	}
}

func (u userDo) Find() ([]*model.User, error) {
	result, err := u.DO.Find()
	return result.([]*model.User), err
}

func (u userDo) FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.User, err error) {
	buf := make([]*model.User, 0, batchSize)
	err = u.DO.FindInBatches(&buf, batchSize, func(tx gen.Dao, batch int) error {
		defer func() { results = append(results, buf...) }()
		return fc(tx, batch)
	})
	return results, err
}

func (u userDo) FindInBatches(result *[]*model.User, batchSize int, fc func(tx gen.Dao, batch int) error) error {
	return u.DO.FindInBatches(result, batchSize, fc)
}

func (u userDo) Attrs(attrs ...field.AssignExpr) *userDo {
	return u.withDO(u.DO.Attrs(attrs...))
}

func (u userDo) Assign(attrs ...field.AssignExpr) *userDo {
	return u.withDO(u.DO.Assign(attrs...))
}

func (u userDo) Joins(fields ...field.RelationField) *userDo {
	for _, _f := range fields {
		u = *u.withDO(u.DO.Joins(_f))
	}
	return &u
}

func (u userDo) Preload(fields ...field.RelationField) *userDo {
	for _, _f := range fields {
		u = *u.withDO(u.DO.Preload(_f))
	}
	return &u
}

func (u userDo) FirstOrInit() (*model.User, error) {
	if result, err := u.DO.FirstOrInit(); err != nil {
		return nil, err
	} else {
		return result.(*model.User), nil
	}
}

func (u userDo) FirstOrCreate() (*model.User, error) {
	if result, err := u.DO.FirstOrCreate(); err != nil {
		return nil, err
	} else {
		return result.(*model.User), nil
	}
}

func (u userDo) FindByPage(offset int, limit int) (result []*model.User, count int64, err error) {
	result, err = u.Offset(offset).Limit(limit).Find()
	if err != nil {
		return
	}

	if size := len(result); 0 < limit && 0 < size && size < limit {
		count = int64(size + offset)
		return
	}

	count, err = u.Offset(-1).Limit(-1).Count()
	return
}

func (u userDo) ScanByPage(result interface{}, offset int, limit int) (count int64, err error) {
	count, err = u.Count()
	if err != nil {
		return
	}

	err = u.Offset(offset).Limit(limit).Scan(result)
	return
}

func (u *userDo) withDO(do gen.Dao) *userDo {
	u.DO = *do.(*gen.DO)
	return u
}
