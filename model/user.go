package model

import "time"

type Response struct {
	Code    int         `json:"code"`
	Message string      `json:"message,omitempty"`
	Totals  int64       `json:"totals,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

type User struct {
	ID        int64     `json:"id" form:"id" gorm:"autoIncrement;primary_key"`
	Name      string    `json:"name" form:"name" gorm:"size:64"`
	Header    string    `json:"hearder" gorm:"size:1048576"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (m *User) TableName() string {
	return "user"
}
