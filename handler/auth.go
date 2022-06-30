package handler

import (
	"github.com/ewingtsai/go-home/common/consts"
	"github.com/ewingtsai/go-home/common/errutil"
	"github.com/ewingtsai/go-home/common/ginutil"
	"github.com/ewingtsai/go-home/config"
	"github.com/ewingtsai/go-home/service"
	"github.com/ewingtsai/go-home/utils/codec"
	"github.com/mojocn/base64Captcha"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

var captchaAesKey = []byte("MnfCSZWU0HPYbVfO")

type CaptchaInfo struct {
	Encode string `json:"encode,omitempty"`
	Image  string `json:"image,omitempty"`
}

func Auth(group *gin.RouterGroup) {
	group.POST("/auth", authHandler)
	group.GET("/logout", authLogout)
	group.GET("/loginer", authLoginer)
	group.GET("/captcha", authCaptcha)
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
		if !errutil.LogIfErr(err) {
			tokenStr = cookie.Value
		}
	}

	user := service.ValidateUser(c, tokenStr)
	if user == nil {
		c.Status(http.StatusUnauthorized)
		c.Abort()
		return
	}

	// 将当前请求的username信息保存到请求的上下文context上
	user.Password = ""
	c.Set(consts.LoginUserKey, user)
	c.Next()
}

func authHandler(c *gin.Context) {
	// 用户发送用户名和密码过来
	var userParam UserVO
	userParam.Name = c.PostForm("login_name")
	userParam.Password = c.PostForm("login_password")

	// 获取并解析验证码
	captchaEncode := c.PostForm("login_captcha_encode")
	captchaCode := c.PostForm("login_captcha_code")
	claims, err := codec.ParseToken(captchaEncode, config.JwtSecret)
	if err != nil {
		ginutil.FailMessage(c, "验证码过期")
		return
	}

	decode64 := codec.Base64DecodeString(claims.Name)
	decodeAes, err := codec.AesDecrypt(decode64, captchaAesKey)
	if err != nil || captchaCode != string(decodeAes) {
		ginutil.FailMessage(c, "验证码错误")
		return
	}

	// 校验用户名和密码是否正确
	user, err := service.GetUserByName(c, userParam.Name)
	if ginutil.HandleError(c, err) {
		return
	}
	if user == nil || len(user.Password) < 1 {
		ginutil.FailMessage(c, "用户名或密码错误")
		return
	}

	// 密码混淆加强
	pwdMd5 := codec.Md5String([]byte(user.Password + captchaCode))
	if userParam.Password == pwdMd5 {
		// 登录版本号增加
		user.AuthVersion++
		err = service.UpdateLoginIndex(c, user)
		if ginutil.HandleError(c, err) {
			return
		}

		// 生成Token
		tokenStr, err := codec.GenToken(&codec.JwtData{
			ID:      user.ID,
			Name:    user.Name,
			Version: user.AuthVersion,
		}, config.JwtSecret)
		if ginutil.HandleError(c, err) {
			return
		}

		c.Header("Set-Cookie", "Authorization="+tokenStr)
		ginutil.SuccessData(c, tokenStr)
		return
	}
	ginutil.FailMessage(c, "用户名或密码错误")
}

func authLogout(c *gin.Context) {
	loginUser, ok := c.Get(consts.LoginUserKey)
	if ok && loginUser != nil {
		// 登录版本号增加
		user := loginUser.(*service.UserBO)
		user.AuthVersion++
		err := service.UpdateLoginIndex(c, user)
		if ginutil.HandleError(c, err) {
			return
		}
	}
	c.Header("Set-Cookie", "Authorization=none")
	ginutil.Success(c)
}

func authCaptcha(c *gin.Context) {
	// 生成验证码
	code := strconv.Itoa(codec.Random().Intn(9000) + 1000)
	item, err := base64Captcha.DefaultDriverDigit.DrawCaptcha(code)
	if ginutil.HandleError(c, err) {
		return
	}

	// 验证码加密后存储到JWT
	encodeAes, err := codec.AesEncrypt([]byte(code), captchaAesKey)
	if ginutil.HandleError(c, err) {
		return
	}
	encodeJwt, err := codec.GenTokenExpire(&codec.JwtData{
		Name: codec.Base64EncodeString(encodeAes),
	}, config.JwtSecret, time.Now().Add(time.Minute*10))
	if ginutil.HandleError(c, err) {
		return
	}

	ginutil.SuccessData(c, &CaptchaInfo{
		Encode: encodeJwt,
		Image:  item.EncodeB64string(),
	})
}

func authLoginer(c *gin.Context) {
	user, _ := c.Get(consts.LoginUserKey)
	ginutil.SuccessData(c, user)
}
