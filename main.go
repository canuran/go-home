package main

import (
	"github.com/ewingtsai/go-web/dal"
	"github.com/ewingtsai/go-web/router"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

var SrvPath = "/srv"
var WebPath = "/web"

func main() {
	dal.Init()

	engine := gin.Default()
	// 静态目录
	engine.Static(WebPath, "web")
	// 指定文件
	engine.StaticFile("/favicon.ico", WebPath + "/images/favicon.ico")

	// 注册路由
	engine.NoRoute(home)
	group := engine.Group(SrvPath)
	router.User(group)

	err := engine.Run(":80")
	if err != nil {
		log.Println("Run server error", err)
	}
}

// 主页
func home(c *gin.Context) {
	c.Redirect(http.StatusPermanentRedirect,
		WebPath+ "/index.html")
}
