package main

import (
	"github.com/ewingtsai/go-web/authserver/authweb"
	"github.com/ewingtsai/go-web/common"
	"github.com/ewingtsai/go-web/userserver"
	"log"
	"net/http"

	"github.com/ewingtsai/go-web/config"
	"github.com/ewingtsai/go-web/userserver/userweb"
	"github.com/gin-gonic/gin"
)

func main() {
	// 按需初始化
	config.Init()
	userserver.Init()

	engine := gin.Default()
	// 静态目录
	engine.Static(common.WebPath, "web")
	// 指定文件
	engine.StaticFile("/favicon.ico", common.WebPath+"/images/favicon.ico")

	// 注册路由
	engine.NoRoute(home)
	group := engine.Group(common.SrvPath)
	group.Use(authweb.JWTAuthMW)
	authweb.Auth(group)
	userweb.User(group)

	err := engine.Run(":80")
	if err != nil {
		log.Println("Run server error", err)
	}
}

func home(c *gin.Context) {
	// Web应用跳转主页，纯后端应用改为JSON
	c.Redirect(http.StatusPermanentRedirect, common.WebPath+"/index.html")
}
