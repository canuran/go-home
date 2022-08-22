package service

import (
	"context"
	"fmt"
	"github.com/canuran/go-home/utils/jsoner"
	"github.com/stretchr/testify/assert"
	"testing"

	"github.com/canuran/go-home/config"
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
	users, err := QueryUser(context.Background(), &UserBO{
		ID: 123, Name: "元宝",
	}, 0, 2)
	assert.Nil(t, err)
	fmt.Println(jsoner.MarshalString(users))
}

func TestCountUser(t *testing.T) {
	users, err := CountUser(context.Background(), nil)
	assert.Nil(t, err)
	fmt.Println(users)
}

func TestDeleteUser(t *testing.T) {
	err := DeleteUser(context.Background(), &UserBO{ID: 1})
	assert.Nil(t, err)
}
