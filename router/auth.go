package router

import (
	"bytes"
	"encoding/base64"
	"math/rand"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/dchest/captcha"
	"github.com/ewingtsai/go-web/common"
	"github.com/ewingtsai/go-web/model"
	"github.com/ewingtsai/go-web/service"
	"github.com/ewingtsai/go-web/util"
	"github.com/gin-gonic/gin"
)

var captchaAesKey = []byte("MnfCSZWU0HPYbVfO")

func Auth(group *gin.RouterGroup) {
	group.POST("/auth", authHandler)
	group.GET("/logout", authLogout)
	group.GET("/loginer", authLoginer)
	group.GET("/captcha", authCaptcha)
}

func authHandler(c *gin.Context) {
	// 用户发送用户名和密码过来
	var userParam model.User
	err := c.ShouldBind(&userParam)
	if handleErr(c, err) {
		return
	}
	// 获取并解析验证码
	captchaEncode := c.PostForm("captcha_encode")
	captchaCode := c.PostForm("captcha_code")
	claims, err := util.ParseToken(captchaEncode)
	if err != nil {
		failureMessage(c, "验证码过期")
		return
	}
	decode64 := util.Base64DecodeString(claims.Name)
	decodeAes, err := util.AesDecrypt(decode64, captchaAesKey)
	if handleErr(c, err) {
		return
	}
	if captchaCode != string(decodeAes) {
		failureMessage(c, "验证码错误")
		return
	}
	// 校验用户名和密码是否正确
	user, err := service.GetUserByName(c, userParam.Name)
	if handleErr(c, err) {
		return
	}
	if len(user.Password) < 1 {
		failureMessage(c, "用户未设置密码")
		return
	}
	// 密码混淆加强
	pwdMd5 := util.Md5String([]byte(user.Password + captchaEncode))
	if userParam.Password == pwdMd5 {
		// 登陆版本号增加
		user.LoginVersion++
		err = service.UpdateLoginIndex(c, user)
		if handleErr(c, err) {
			return
		}
		// 生成Token
		tokenStr, err := util.GenToken(&util.JwtData{
			Name:    user.Name,
			Version: user.LoginVersion,
		})
		if handleErr(c, err) {
			return
		}
		c.Header("Set-Cookie", "Authorization="+tokenStr)
		successData(c, tokenStr)
		return
	}
	failureMessage(c, "用户名或密码错误")
}

func authLogout(c *gin.Context) {
	loginUser, ok := c.Get(common.LoginUserKey)
	if ok && loginUser != nil {
		// 登陆版本号增加
		user := loginUser.(*model.User)
		user.LoginVersion++
		err := service.UpdateLoginIndex(c, user)
		if handleErr(c, err) {
			return
		}
	}
	c.Header("Set-Cookie", "Authorization=none")
	success(c)
}

func authCaptcha(c *gin.Context) {
	// 生成图片转Base64
	code := strconv.Itoa(rand.Intn(8888) + 1000)
	img := captcha.NewImage(code, util.DigitBytes([]rune(code)), 150, 50)
	var buffer bytes.Buffer
	encoder := base64.NewEncoder(base64.StdEncoding, &buffer)
	img.WriteTo(encoder)
	util.Close(encoder)

	// 验证码加密后存储到JWT
	encodeAes, err := util.AesEncrypt([]byte(code), captchaAesKey)
	if handleErr(c, err) {
		return
	}
	encodeJwt, err := util.GenTokenExpire(&util.JwtData{
		Name: util.Base64EncodeString(encodeAes),
	}, time.Now().Add(time.Minute*10))
	if handleErr(c, err) {
		return
	}
	successData(c, &common.CaptchaInfo{
		Encode: encodeJwt,
		Image:  string(buffer.Bytes()),
	})
}

func authLoginer(c *gin.Context) {
	user, _ := c.Get(common.LoginUserKey)
	successData(c, user)
}

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
		if util.LogIfErr(err) {
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
	claims, err := util.ParseToken(tokenStr)
	if util.LogIfErr(err) {
		unauthorized(c)
		return
	}
	// 空名称的是盐
	if len(claims.Name) < 1 {
		unauthorized(c)
		return
	}

	// 验证登陆版本是否失效
	user, err := service.GetUserByName(c, claims.Name)
	if util.LogIfErr(err) {
		unauthorized(c)
		return
	}
	if claims.Version < user.LoginVersion {
		unauthorized(c)
		return
	}
	// 将当前请求的username信息保存到请求的上下文context上
	user.Password = ""
	c.Set(common.LoginUserKey, user)
	c.Next()
}

func unauthorized(c *gin.Context) {
	c.Status(http.StatusUnauthorized)
	c.Abort()
}
