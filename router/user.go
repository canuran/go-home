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
	successData(c, util.StandardizeRunes([]rune(name)))
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
		err = util.ConvertImage(&util.ConvertOption{
			Reader:        headerFile,
			NewWidth:      100,
			NewHeight:     100,
			Writer:        &buffer,
			OutFormat:     "jpg",
			MaxJpgOutByte: 5120, // 最大5KB
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

	cPage := c.DefaultQuery("cPage", "1")
	pSize := c.DefaultQuery("pSize", "10")
	limit := int(util.Int64ify(pSize))
	offset := int(util.Int64ify(cPage)) * limit - limit
	users, err := service.QueryUser(c, user, offset, limit)
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
