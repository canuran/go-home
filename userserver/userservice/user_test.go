package userservice

import (
	"context"
	"fmt"
	"github.com/ewingtsai/go-web/userserver/userdal"
	"testing"

	"github.com/ewingtsai/go-web/config"
	"github.com/ewingtsai/go-web/utils"
)

func InitTest() {
	config.InitTest()
	userdal.Init()
}

func TestSaveUser(t *testing.T) {
	InitTest()
	err := SaveUser(context.Background(), &UserBO{
		ID: 123, Name: "元宝", Password: "yb",
	})
	utils.TestingErr(t, err)
}

func TestQueryUser(t *testing.T) {
	InitTest()
	users, err := QueryUser(context.Background(), &UserBO{
		ID: 123, Name: "元宝",
	}, 0, 2)
	utils.TestingErr(t, err)
	fmt.Println(utils.JsonMarshalString(users))
}

func TestCountUser(t *testing.T) {
	InitTest()
	users, err := CountUser(context.Background(), nil)
	utils.TestingErr(t, err)
	fmt.Println(users)
}

func TestDeleteUser(t *testing.T) {
	InitTest()
	err := DeleteUser(context.Background(), &UserBO{ID: 1})
	utils.TestingErr(t, err)
}
