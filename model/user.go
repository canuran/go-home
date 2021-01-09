package model

import (
	"time"
)

type User struct {
	ID           int64     `json:"id,omitempty" form:"id" gorm:"autoIncrement;primaryKey"`
	Name         string    `json:"name,omitempty" form:"name" gorm:"uniqueIndex;size:32"`
	Password     string    `json:"password,omitempty" form:"password" gorm:"size:32"`
	Header       string    `json:"header,omitempty" gorm:"size:5120"` // 存储很小的头像
	Gender       string    `json:"gender,omitempty" form:"gender" gorm:"size:16"`
	Role         string    `json:"role,omitempty" form:"role" gorm:"size:32"`
	Status       int       `json:"status,omitempty" form:"status"`
	LoginVersion int64     `json:"login_version"`
	CreatedAt    time.Time `json:"created_at,omitempty"`
	UpdatedAt    time.Time `json:"updated_at,omitempty" gorm:"index"`
}

func (m *User) TableName() string {
	return "user"
}
