package userbiz

import (
	"context"
	"fmt"
	"github.com/ewingtsai/go-web/common"
	"github.com/ewingtsai/go-web/usersrv/userdal"
	"github.com/ewingtsai/go-web/utils/jsons"
	"testing"

	"github.com/ewingtsai/go-web/config"
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
	common.TestingErr(t, err)
}

func TestQueryUser(t *testing.T) {
	InitTest()
	users, err := QueryUser(context.Background(), &UserBO{
		ID: 123, Name: "元宝",
	}, 0, 2)
	common.TestingErr(t, err)
	fmt.Println(jsons.JsonMarshalString(users))
}

func TestCountUser(t *testing.T) {
	InitTest()
	users, err := CountUser(context.Background(), nil)
	common.TestingErr(t, err)
	fmt.Println(users)
}

func TestDeleteUser(t *testing.T) {
	InitTest()
	err := DeleteUser(context.Background(), &UserBO{ID: 1})
	common.TestingErr(t, err)
}