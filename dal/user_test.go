package dal

import (
	"context"
	"fmt"
	"github.com/ewingtsai/go-web/config"
	"github.com/ewingtsai/go-web/model"
	"github.com/ewingtsai/go-web/util"
	"testing"
)

func TestSaveUser(t *testing.T) {
	config.InitTest()
	err := SaveUser(context.Background(), &UserParam{
		Entity: &model.User{
			ID:   123,
			Name: "元宝",
		},
		SelectFields: []string{"id", "name"},
		Offset:       0,
		Limit:        2,
	})
	if util.TestingErr(t, err) {
		return
	}
}

func TestQueryUser(t *testing.T) {
	config.InitTest()
	users, err := QueryUser(context.Background(), &UserParam{
		Entity: &model.User{
			ID:   123,
			Name: "元宝",
		},
		SelectFields: []string{"name", "status"},
		Offset:       0,
		Limit:        2,
	})
	if util.TestingErr(t, err) {
		return
	}
	fmt.Println(util.JsonMarshalString(users))
}
