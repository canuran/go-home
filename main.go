package main

import (
	"github.com/ewingtsai/go-web/common/consts"
	"github.com/ewingtsai/go-web/handler"
	log "github.com/sirupsen/logrus"
	"net/http"

	"github.com/ewingtsai/go-web/config"
	"github.com/gin-gonic/gin"
)

func main() {
	// 按需初始化
	config.Init()

	engine := gin.Default()
	// 静态目录
	engine.Static(consts.WebPath, "web")
	// 指定文件
	engine.StaticFile("/favicon.ico", consts.WebPath+"/image/favicon.ico")

	// 注册路由
	engine.NoRoute(home)
	group := engine.Group(consts.SrvPath)
	group.Use(handler.JWTAuthMW)
	handler.Auth(group)
	handler.User(group)

	err := engine.Run(":80")
	if err != nil {
		log.Println("Run server error", err)
	}
}

func home(c *gin.Context) {
	// Web应用跳转主页，纯后端应用改为JSON
	c.Redirect(http.StatusPermanentRedirect, consts.WebPath+"/index.html")
}
