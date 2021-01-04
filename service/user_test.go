package service

import (
	"context"
	"fmt"
	"testing"

	"github.com/ewingtsai/go-web/config"
	"github.com/ewingtsai/go-web/model"
	"github.com/ewingtsai/go-web/util"
)

func TestSaveUser(t *testing.T) {
	config.InitTest()
	err := SaveUser(context.Background(), &model.User{
		ID: 123, Name: "元宝",
	})
	util.TestingErr(t, err)
}

func TestQueryUser(t *testing.T) {
	config.InitTest()
	users, err := QueryUser(context.Background(), &model.User{
		ID: 1, Name: "元宝",
	})
	util.TestingErr(t, err)
	fmt.Println(string(util.JsonMarshal(users)))
}

func TestCountUser(t *testing.T) {
	config.InitTest()
	users, err := CountUser(context.Background(), nil)
	util.TestingErr(t, err)
	fmt.Println(users)
}

func TestDeleteUser(t *testing.T) {
	config.InitTest()
	err := DeleteUser(context.Background(), &model.User{ID: 1})
	util.TestingErr(t, err)
}
