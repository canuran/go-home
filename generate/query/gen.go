// Status generated by gorm.io/gen. DO NOT EDIT.
// Status generated by gorm.io/gen. DO NOT EDIT.
// Status generated by gorm.io/gen. DO NOT EDIT.

package query

import (
	"context"
	"database/sql"

	"gorm.io/gorm"
)

var (
	Q      = new(Query)
	Config *config
	User   *user
)

func SetDefault(db *gorm.DB) {
	*Q = *Use(db)
	Config = &Q.Config
	User = &Q.User
}

func Use(db *gorm.DB) *Query {
	return &Query{
		db:     db,
		Config: newConfig(db),
		User:   newUser(db),
	}
}

type Query struct {
	db *gorm.DB

	Config config
	User   user
}

func (q *Query) Available() bool { return q.db != nil }

func (q *Query) clone(db *gorm.DB) *Query {
	return &Query{
		db:     db,
		Config: q.Config.clone(db),
		User:   q.User.clone(db),
	}
}

type queryCtx struct {
	Config configDo
	User   userDo
}

func (q *Query) WithContext(ctx context.Context) *queryCtx {
	return &queryCtx{
		Config: *q.Config.WithContext(ctx),
		User:   *q.User.WithContext(ctx),
	}
}

func (q *Query) Transaction(fc func(tx *Query) error, opts ...*sql.TxOptions) error {
	return q.db.Transaction(func(tx *gorm.DB) error { return fc(q.clone(tx)) }, opts...)
}

func (q *Query) Begin(opts ...*sql.TxOptions) *QueryTx {
	return &QueryTx{q.clone(q.db.Begin(opts...))}
}

type QueryTx struct{ *Query }

func (q *QueryTx) Commit() error {
	return q.db.Commit().Error
}

func (q *QueryTx) Rollback() error {
	return q.db.Rollback().Error
}

func (q *QueryTx) SavePoint(name string) error {
	return q.db.SavePoint(name).Error
}

func (q *QueryTx) RollbackTo(name string) error {
	return q.db.RollbackTo(name).Error
}
