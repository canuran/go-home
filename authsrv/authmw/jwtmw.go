package authmw

import (
	"github.com/ewingtsai/go-web/authsrv/authjwt"
	"github.com/ewingtsai/go-web/common/consts"
	"github.com/ewingtsai/go-web/tools/errer"
	"github.com/ewingtsai/go-web/usersrv/userbiz"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

// JWTAuthMW 基于JWT的认证中间件
func JWTAuthMW(c *gin.Context) {
	if strings.HasSuffix(c.Request.RequestURI, "/auth") ||
		strings.HasSuffix(c.Request.RequestURI, "/captcha") ||
		strings.HasSuffix(c.Request.RequestURI, "/logout") {
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
		if errer.LogIfErr(err) {
			unauthorized(c)
			return
		}
		tokenStr = cookie.Value
	}
	if len(tokenStr) < 1 {
		unauthorized(c)
		return
	}

	// 解析JWT
	claims, err := authjwt.ParseToken(tokenStr)
	if errer.LogIfErr(err) {
		unauthorized(c)
		return
	}
	// 空名称的是盐
	if len(claims.Name) < 1 {
		unauthorized(c)
		return
	}

	// 验证登陆版本是否失效
	user, err := userbiz.GetUserById(c, claims.ID)
	if errer.LogIfErr(err) {
		unauthorized(c)
		return
	}
	if user == nil {
		unauthorized(c)
		return
	}
	if claims.Version < user.AuthVersion {
		unauthorized(c)
		return
	}
	// 将当前请求的username信息保存到请求的上下文context上
	user.Password = ""
	c.Set(consts.LoginUserKey, user)
	c.Next()
}

func unauthorized(c *gin.Context) {
	c.Status(http.StatusUnauthorized)
	c.Abort()
}
