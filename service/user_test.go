package service

import (
	"context"
	"fmt"
	"github.com/ewingtsai/go-home/common/errutil"
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
	errutil.TestingErr(t, err)
}

func TestQueryUser(t *testing.T) {
	users, err := QueryUser(context.Background(), &UserBO{
		ID: 123, Name: "元宝",
	}, 0, 2)
	errutil.TestingErr(t, err)
	fmt.Println(jsoner.JsonMarshalString(users))
}

func TestCountUser(t *testing.T) {
	users, err := CountUser(context.Background(), nil)
	errutil.TestingErr(t, err)
	fmt.Println(users)
}

func TestDeleteUser(t *testing.T) {
	err := DeleteUser(context.Background(), &UserBO{ID: 1})
	errutil.TestingErr(t, err)
}
