package service

import (
	"context"
	"log"

	"github.com/ewingtsai/go-web/dal"
	"github.com/ewingtsai/go-web/model"
)

func SaveUser(ctx context.Context, user *model.User) error {
	log.Println("SaveUser", user)
	return dal.Transaction(ctx, func(ctx context.Context) error {
		return dal.SaveUser(ctx, user)
	})
}

func QueryUser(ctx context.Context, user *model.User) ([]*model.User, error) {
	return dal.QueryUser(ctx, user)
}

func CountUser(ctx context.Context, user *model.User) (int64, error) {
	return dal.CountUser(ctx, user)
}
