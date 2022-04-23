package main

import (
	"github.com/ewingtsai/go-home/common/consts"
	"github.com/ewingtsai/go-home/handler"
	log "github.com/sirupsen/logrus"
	"net/http"

	"github.com/ewingtsai/go-home/config"
	"github.com/gin-gonic/gin"
)

func main() {
	// 按需初始化
	config.Init()
	engine := gin.Default()

	// 静态文件
	engine.Static(consts.WebPath, "web")
	engine.StaticFile("/favicon.ico", consts.WebPath+"/image/favicon.ico")

	// 缺省路由
	engine.NoRoute(none)
	engine.GET("/", index)

	// 注册路由
	group := engine.Group(consts.SrvPath)
	group.Use(handler.JWTAuthMW)
	handler.Auth(group)
	handler.User(group)

	err := engine.Run(":80")
	if err != nil {
		log.Println("Run server error", err)
	}
}

func index(c *gin.Context) {
	c.Redirect(http.StatusPermanentRedirect, consts.WebPath+"/index.html")
}

func none(c *gin.Context) {
	c.Redirect(http.StatusPermanentRedirect, consts.WebPath+"/none.html")
}
