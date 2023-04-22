package service

import (
	"context"
	"fmt"
	"github.com/canuran/go-home/comm"
	"github.com/canuran/go-home/config"
	"github.com/canuran/go-home/dal"
	"github.com/canuran/go-home/utils/jsoner"
	"github.com/stretchr/testify/assert"
	"testing"
)

func init() {
	config.InitTest()
}

func TestSaveUser(t *testing.T) {
	err := SaveUser(context.Background(), &UserBO{
		ID: 123, Name: "元宝", Password: "yb",
	})
	assert.Nil(t, err)
}

func TestQueryUser(t *testing.T) {
	users, err := QueryUser(context.Background(), &dal.QueryUserParam{
		Pager: &comm.Pager{Limit: 2, GetRows: true},
		IdEq:  123, NameEq: "元宝",
	})
	assert.Nil(t, err)
	fmt.Println(jsoner.MarshalString(users))
}

func TestCountUser(t *testing.T) {
	users, err := CountUser(context.Background(), &dal.QueryUserParam{})
	assert.Nil(t, err)
	fmt.Println(users)
}

func TestDeleteUser(t *testing.T) {
	err := DeleteUser(context.Background(), &UserBO{ID: 1})
	assert.Nil(t, err)
}
