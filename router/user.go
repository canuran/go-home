package router

import (
	"bytes"
	"github.com/ewingtsai/go-web/model"
	"github.com/ewingtsai/go-web/service"
	"github.com/ewingtsai/go-web/util"
	"github.com/gin-gonic/gin"
)

// User 用户
func User(group *gin.RouterGroup) {
	// 注册路由
	group.POST("user/save", saveUser)
	group.GET("user/query", queryUser)
	group.POST("user/delete", deleteUser)
	group.GET("filter_name", filterName)
}

func filterName(c *gin.Context) {
	name := c.Query("name")
	successData(c, util.FilterName([]rune(name)))
}

func saveUser(c *gin.Context) {
	user := &model.User{}
	err := c.ShouldBind(user)
	if handleErr(c, err) {
		return
	}
	headerImg, err := c.FormFile("header_img")
	if err == nil {
		headerFile, err := headerImg.Open()
		if handleErr(c, err) {
			return
		}
		var buffer bytes.Buffer
		err = util.ImageResize(&util.ResizeOption{
			Reader:  headerFile,
			Width:   100,
			Height:  100,
			Writer:  &buffer,
			InName:  headerImg.Filename,
			OutName: "jpg",
		})
		if handleErr(c, err) {
			return
		}
		bts := buffer.Bytes()
		user.Header = string(util.Base64Encode(bts))
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

func deleteUser(c *gin.Context) {
	user := &model.User{}
	err := c.ShouldBind(user)
	if handleErr(c, err) {
		return
	}
	err = service.DeleteUser(c, user)
	if handleErr(c, err) {
		return
	}
	success(c)
}
