package main

import (
	"log"
	"net/http"

	"github.com/ewingtsai/go-web/dal"
	"github.com/ewingtsai/go-web/router"
	"github.com/gin-gonic/gin"
)

func main() {
	dal.Init()

	engine := gin.Default()

	// 静态目录
	engine.Static("static", "web")
	// 指定文件
	engine.StaticFile("/favicon.ico", "web/favicon.ico")

	// 注册路由
	engine.NoRoute(home)
	engine.GET("", home)
	router.User(engine)

	err := engine.Run(":80")
	if err != nil {
		log.Println("Run server error", err)
	}
}

// 主页
func home(context *gin.Context) {
	context.String(http.StatusOK, "欢迎访问！")
}
