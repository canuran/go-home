package router

import (
	"fmt"
	"github.com/ewingtsai/go-web/common"
	"github.com/ewingtsai/go-web/model"
	"github.com/ewingtsai/go-web/service"
	"github.com/ewingtsai/go-web/util"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
	"time"
)

func Auth(group *gin.RouterGroup) {
	group.POST("/auth", authHandler)
	group.GET("/logout", authLogout)
	group.GET("/loginer", authLoginer)
	group.GET("/salt", authSalt)
}

func authHandler(c *gin.Context) {
	// 用户发送用户名和密码过来
	var userParam model.User
	err := c.ShouldBind(&userParam)
	if handleErr(c, err) {
		return
	}
	salt := c.PostForm("salt")
	_, err = util.ParseToken(salt)
	if handleErr(c, err) {
		return
	}
	// 校验用户名和密码是否正确
	user, err := service.GetUserByName(c, userParam.Name)
	if handleErr(c, err) {
		return
	}
	if len(user.Password) < 1 {
		if handleErr(c, fmt.Errorf("用户未设置密码")) {
			return
		}
	}
	// 密码混淆加强
	pwdMd5 := util.StringMd5(user.Name + user.Password + salt)
	if userParam.Password == pwdMd5 {
		// 生成Token
		tokenStr, err := util.GenToken(userParam.Name)
		if handleErr(c, err) {
			return
		}
		c.Header("Set-Cookie", "Authorization="+tokenStr)
		successData(c, tokenStr)
		return
	}
}

func authLogout(c *gin.Context) {
	c.Header("Set-Cookie", "Authorization=none")
	success(c)
}

func authSalt(c *gin.Context) {
	// 登陆盐过期无效
	saltToken, err := util.GenTokenExpire("", time.Now().Add(time.Minute*10))
	if handleErr(c, err) {
		return
	}
	successData(c, saltToken)
}

func authLoginer(c *gin.Context) {
	claims, _ := c.Get(util.JwtClaimsKey)
	successData(c, claims)
}

// JWTAuthMW 基于JWT的认证中间件
func JWTAuthMW(c *gin.Context) {
	if c.Request.RequestURI == common.SrvPath+"/auth" ||
		c.Request.RequestURI == common.SrvPath+"/salt" {
		c.Next()
		return
	}
	// 从Header的Authorization中获取
	var tokenStr string
	authHeader := c.Request.Header.Get("Authorization")
	if len(authHeader) > 0 {
		index := strings.LastIndex(authHeader, " ")
		tokenStr = authHeader[index+1:]
	}

	// 从Cookie中获取
	if len(tokenStr) < 1 {
		cookie, err := c.Request.Cookie("Authorization")
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
	// 空名称的是盐
	if len(claims.Name) < 1 {
		c.Status(http.StatusUnauthorized)
		c.Abort()
		return
	}
	// 将当前请求的username信息保存到请求的上下文context上
	c.Set(util.JwtClaimsKey, claims)
	c.Next()
}
