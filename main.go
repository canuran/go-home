package main

import (
	"github.com/ewingtsai/go-web/common"
	"log"
	"net/http"

	"github.com/ewingtsai/go-web/config"
	"github.com/ewingtsai/go-web/router"
	"github.com/gin-gonic/gin"
)



func main() {
	config.Init()

	engine := gin.Default()
	// 静态目录
	engine.Static(common.WebPath, "web")
	// 指定文件
	engine.StaticFile("/favicon.ico", common.WebPath+"/images/favicon.ico")

	// 注册路由
	engine.NoRoute(home)
	group := engine.Group(common.SrvPath)
	group.Use(router.JWTAuthMW)
	router.Auth(group)
	router.User(group)

	err := engine.Run(":80")
	if err != nil {
		log.Println("Run server error", err)
	}
}

// 主页
func home(c *gin.Context) {
	c.Redirect(http.StatusPermanentRedirect, common.WebPath+"/index.html")
}
