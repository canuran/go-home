package comm

import (
	"gorm.io/gen"
)

type Response struct {
	Status  int    `json:"status"` // 自定义的状态码应当大于1000
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

func PageScope(pager *Pager) func(gen.Dao) gen.Dao {
	return func(dao gen.Dao) gen.Dao {
		if pager == nil {
			return dao
		}
		if pager.Offset > 0 {
			dao = dao.Offset(pager.Offset)
		}
		if pager.Limit > 0 {
			dao = dao.Limit(pager.Limit)
		}
		return dao
	}
}
