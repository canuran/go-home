package service

import (
	"context"
	"fmt"
	"testing"

	"github.com/ewingtsai/go-web/model"
	"github.com/ewingtsai/go-web/util"
)

func TestSaveUser(t *testing.T) {
	InitTest()
	err := SaveUser(context.Background(), &model.User{
		ID: 123, Name: "元宝",
	})
	util.TestingErr(t, err)
}

func TestQueryUser(t *testing.T) {
	InitTest()
	users, err := QueryUser(context.Background(), &model.User{
		ID: 1, Name: "元宝",
	})
	util.TestingErr(t, err)
	fmt.Println(string(util.JsonMarshal(users)))
}

func TestCountUser(t *testing.T) {
	InitTest()
	users, err := CountUser(context.Background(), nil)
	util.TestingErr(t, err)
	fmt.Println(users)
}
