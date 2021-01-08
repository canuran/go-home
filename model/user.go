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
	ID           int64     `json:"id" form:"id" gorm:"autoIncrement;primaryKey"`
	Name         string    `json:"name" form:"name" gorm:"uniqueIndex;size:32"`
	Password     string    `json:"password" form:"password" gorm:"size:32"`
	Header       string    `json:"header" gorm:"size:5120"`
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
