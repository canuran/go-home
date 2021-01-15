package userdal

import (
	"context"
	"fmt"
	"github.com/ewingtsai/go-web/common"
	"github.com/ewingtsai/go-web/config"
	"github.com/ewingtsai/go-web/utils/jsons"
	"testing"
)

func InitTest() {
	config.InitTest()
	Init()
}

func TestSaveUser(t *testing.T) {
	InitTest()
	err := SaveUser(context.Background(), &UserParam{
		Entity: &UserPO{
			ID:   123,
			Name: "元宝",
		},
		SelectFields: []string{"id", "name"},
		Offset:       0,
		Limit:        2,
	})
	if common.TestingErr(t, err) {
		return
	}
}

func TestQueryUser(t *testing.T) {
	InitTest()
	users, err := QueryUser(context.Background(), &UserParam{
		Entity: &UserPO{
			ID:   123,
			Name: "元宝",
		},
		SelectFields: []string{"name", "status"},
		Offset:       0,
		Limit:        2,
	})
	if common.TestingErr(t, err) {
		return
	}
	fmt.Println(jsons.JsonMarshalString(users))
}
