package comm

import (
	"gorm.io/gen"
)

type Response struct {
	Code    int    `json:"code"`
	Message string `json:"message,omitempty"`
	Totals  int64  `json:"totals,omitempty"`
	Data    any    `json:"data,omitempty"`
}

type Condition struct {
	Name     string       `json:"name,omitempty"`
	Value    string       `json:"value,omitempty"`
	Type     string       `json:"type,omitempty"`
	Children []*Condition `json:"children,omitempty"`
}

type Pager struct {
	Offset   int
	Limit    int
	GetRows  bool
	GetCount bool
}

func PageScope(pager Pager) func(gen.Dao) gen.Dao {
	return func(dao gen.Dao) gen.Dao {
		if pager.Offset > 0 {
			dao = dao.Offset(pager.Offset)
		}
		if pager.Limit > 0 {
			dao = dao.Limit(pager.Limit)
		}
		return dao
	}
}
