package service

import (
	"context"
	"fmt"
	"github.com/ewingtsai/go-home/utils/errorer"
	"github.com/ewingtsai/go-home/utils/jsoner"
	"testing"

	"github.com/ewingtsai/go-home/config"
)

func init() {
	config.InitTest()
}

func TestSaveUser(t *testing.T) {
	err := SaveUser(context.Background(), &UserBO{
		ID: 123, Name: "元宝", Password: "yb",
	})
	errorer.TestingErr(t, err)
}

func TestQueryUser(t *testing.T) {
	users, err := QueryUser(context.Background(), &UserBO{
		ID: 123, Name: "元宝",
	}, 0, 2)
	errorer.TestingErr(t, err)
	fmt.Println(jsoner.JsonMarshalString(users))
}

func TestCountUser(t *testing.T) {
	users, err := CountUser(context.Background(), nil)
	errorer.TestingErr(t, err)
	fmt.Println(users)
}

func TestDeleteUser(t *testing.T) {
	err := DeleteUser(context.Background(), &UserBO{ID: 1})
	errorer.TestingErr(t, err)
}
