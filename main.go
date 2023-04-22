package main

import (
	"github.com/canuran/go-home/comm"
	"github.com/canuran/go-home/config"
	"github.com/canuran/go-home/handler"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"net/http"
)

func main() {
	// 按需初始化
	config.Init()
	gin.SetMode(gin.ReleaseMode)
	root := gin.Default()
	_ = root.SetTrustedProxies(nil)

	// 缺省路由
	root.NoRoute(none)

	// 静态文件
	root.Use(static.Serve("/", static.LocalFile("web", false)))
	root.StaticFile("/favicon.ico", "web/image/favicon.ico")

	// 后端接口
	api := root.Group("/api")
	api.Use(handler.JWTAuthMW)
	handler.Auth(api)
	handler.User(api)

	err := root.Run(":80")
	if err != nil {
		logrus.Errorf("run server error: %v", err)
	}
}

func none(c *gin.Context) {
	if c.Request.Method == "GET" || c.Request.Method == "" {
		c.File("web/none.html")
	} else {
		c.JSON(http.StatusOK, comm.Response{
			Status:  http.StatusNotFound,
			Message: "path not found",
		})
	}
}
