package main

import (
	"embed"
	"github.com/canuran/go-home/comm"
	"github.com/canuran/go-home/config"
	"github.com/canuran/go-home/handler"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"net/http"
	"os"
	"strings"
)

//go:embed web
var webFS embed.FS

func main() {
	// 按需初始化
	config.Init()
	gin.SetMode(gin.ReleaseMode)
	root := gin.Default()
	_ = root.SetTrustedProxies(nil)

	// 缺省路由
	root.NoRoute(none)
	root.GET("/", func(c *gin.Context) {
		c.Redirect(http.StatusTemporaryRedirect, "/web/")
	})
	// 静态文件
	webDir, err := os.Stat("web")
	if err == nil && webDir.IsDir() {
		root.Static("/web/", "web")
	} else {
		root.Any("/web/*filepath", embedStatic())
	}

	// 后端接口
	api := root.Group("/api")
	api.Use(handler.JWTAuthMW)
	handler.Auth(api)
	handler.User(api)

	err = root.Run(":80")
	if err != nil {
		logrus.Errorf("run server error: %v", err)
	}
}

func embedStatic() func(c *gin.Context) {
	fileServer := http.FileServer(http.FS(webFS))
	return func(c *gin.Context) {
		name := strings.TrimPrefix(c.Request.URL.Path, "/")
		_, err := webFS.Open(strings.TrimSuffix(name, "/"))
		if err != nil {
			c.Redirect(http.StatusTemporaryRedirect, "/web/none.html")
			return
		}
		fileServer.ServeHTTP(c.Writer, c.Request)
	}
}

func none(c *gin.Context) {
	if strings.HasPrefix(c.Request.URL.Path, "/api") {
		c.JSON(http.StatusOK, comm.Response{
			Status:  http.StatusNotFound,
			Message: "path not found",
		})
	} else {
		c.Redirect(http.StatusTemporaryRedirect, "/web/none.html")
	}
}
