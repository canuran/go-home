package common

type Response struct {
	Code    int         `json:"code"`
	Message string      `json:"message,omitempty"`
	Totals  int64       `json:"totals,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

type Pager struct {
	Offset   int
	Limit    int
	GetRows  bool
	GetCount bool
}
