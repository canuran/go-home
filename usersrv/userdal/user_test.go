package userdal

import (
	"context"
	"fmt"
	"github.com/ewingtsai/go-web/config"
	"github.com/ewingtsai/go-web/utils/errorer"
	"github.com/ewingtsai/go-web/utils/jsoner"
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
	if errorer.TestingErr(t, err) {
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
	if errorer.TestingErr(t, err) {
		return
	}
	fmt.Println(jsoner.JsonMarshalString(users))
}
