package model

import (
	"time"
)

type Response struct {
	Code    int         `json:"code"`
	Message string      `json:"message,omitempty"`
	Totals  int64       `json:"totals,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

type User struct {
	ID           int64     `json:"id" form:"id" gorm:"autoIncrement;primary_key"`
	Name         string    `json:"name" form:"name" gorm:"size:64;index"`
	Password     string    `json:"password" form:"password" gorm:"size:64"`
	Header       string    `json:"header" form:"header" gorm:"size:10240"`
	Gender       string    `json:"gender" form:"gender" gorm:"size:16"`
	Role         string    `json:"role" form:"role" gorm:"size:32"`
	Status       int       `json:"status" form:"status"`
	LoginVersion int64     `json:"login_version"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at" gorm:"index"`
}

func (m *User) TableName() string {
	return "user"
}
