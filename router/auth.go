package router

import (
	"github.com/ewingtsai/go-web/common"
	"github.com/ewingtsai/go-web/model"
	"github.com/ewingtsai/go-web/service"
	"github.com/ewingtsai/go-web/util"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

func Auth(group *gin.RouterGroup) {
	group.POST("/auth", authHandler)
	group.GET("/current_user", currentUser)
}

func authHandler(c *gin.Context) {
	// 用户发送用户名和密码过来
	var userParam model.User
	err := c.ShouldBind(&userParam)
	if handleErr(c, err) {
		return
	}
	// 校验用户名和密码是否正确
	user, err := service.GetUserByName(c, userParam.Name)
	if handleErr(c, err) {
		return
	}
	if userParam.Name == user.Name && userParam.Password == user.Password {
		// 生成Token
		tokenStr, err := util.GenToken(userParam.Name)
		if handleErr(c, err) {
			return
		}
		c.Header("Set-Cookie", "JsonWebToken="+tokenStr)
		successData(c, tokenStr)
		return
	}
}

func currentUser(c *gin.Context) {
	claims, _ := c.Get(util.JwtClaimsKey)
	successData(c, claims)
}

// JWTAuthMW 基于JWT的认证中间件
func JWTAuthMW(c *gin.Context) {
	if c.Request.RequestURI == common.SrvPath+"/auth" {
		c.Next()
		return
	}
	// 从Header的Authorization中获取
	var tokenStr string
	authHeader := c.Request.Header.Get("Authorization")
	authTokens := strings.SplitN(authHeader, " ", 2)
	if len(authTokens) > 1 {
		tokenStr = authTokens[1]
	}

	// 从Cookie中获取
	if len(tokenStr) < 1 {
		cookie, err := c.Request.Cookie("JsonWebToken")
		if util.LogIfErr(err) {
			c.Status(http.StatusUnauthorized)
			c.Abort()
			return
		}
		tokenStr = cookie.Value
	}
	if len(tokenStr) < 1 {
		c.Status(http.StatusUnauthorized)
		c.Abort()
		return
	}

	// 解析JWT
	claims, err := util.ParseToken(tokenStr)
	if util.LogIfErr(err) {
		c.Status(http.StatusUnauthorized)
		c.Abort()
		return
	}
	// 将当前请求的username信息保存到请求的上下文context上
	c.Set(util.JwtClaimsKey, claims)
	c.Next()
}
