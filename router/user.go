package router

import (
	"github.com/ewingtsai/go-web/model"
	"github.com/ewingtsai/go-web/service"
	"github.com/gin-gonic/gin"
)

// User 用户
func User(engine *gin.Engine) {
	// 注册路由
	engine.POST("user", saveUser)
	engine.GET("user", queryUser)
}

func saveUser(c *gin.Context) {
	user := &model.User{}
	err := c.ShouldBind(user)
	if handleErr(c, err) {
		return
	}
	err = service.SaveUser(c, user)
	if handleErr(c, err) {
		return
	}
	success(c)
}

func queryUser(c *gin.Context) {
	user := &model.User{}
	err := c.ShouldBindQuery(user)
	if handleErr(c, err) {
		return
	}

	if c.Query("count") == "true" {
		totals, err := service.CountUser(c, user)
		if handleErr(c, err) {
			return
		}
		successTotals(c, totals)
		return
	}

	users, err := service.QueryUser(c, user)
	if handleErr(c, err) {
		return
	}
	successData(c, users)
}
