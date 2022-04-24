package handler

import (
	"bytes"
	"encoding/base64"
	"github.com/ewingtsai/go-home/common/consts"
	"github.com/ewingtsai/go-home/common/errutil"
	"github.com/ewingtsai/go-home/common/ginutil"
	"github.com/ewingtsai/go-home/config"
	"github.com/ewingtsai/go-home/service"
	"github.com/ewingtsai/go-home/utils/encoders"
	"github.com/ewingtsai/go-home/utils/encriptor"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/dchest/captcha"
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
	claims, err := encriptor.ParseToken(captchaEncode, config.JwtSecret)
	if err != nil {
		ginutil.FailMessage(c, "验证码过期")
		return
	}

	decode64 := encoders.Base64DecodeString(claims.Name)
	decodeAes, err := encriptor.AesDecrypt(decode64, captchaAesKey)
	if ginutil.FailIfError(c, err) {
		return
	}
	if captchaCode != string(decodeAes) {
		ginutil.FailMessage(c, "验证码错误")
		return
	}

	// 校验用户名和密码是否正确
	user, err := service.GetUserByName(c, userParam.Name)
	if ginutil.FailIfError(c, err) {
		return
	}
	if user == nil {
		ginutil.FailMessage(c, "登录用户不存在")
		return
	}
	if len(user.Password) < 1 {
		ginutil.FailMessage(c, "用户未设置密码")
		return
	}

	// 密码混淆加强
	pwdMd5 := encoders.Md5String([]byte(user.Password + captchaCode))
	if userParam.Password == pwdMd5 {
		// 登录版本号增加
		user.AuthVersion++
		err = service.UpdateLoginIndex(c, user)
		if ginutil.FailIfError(c, err) {
			return
		}

		// 生成Token
		tokenStr, err := encriptor.GenToken(&encriptor.JwtData{
			ID:      user.ID,
			Name:    user.Name,
			Version: user.AuthVersion,
		}, config.JwtSecret)
		if ginutil.FailIfError(c, err) {
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
		if ginutil.FailIfError(c, err) {
			return
		}
	}
	c.Header("Set-Cookie", "Authorization=none")
	ginutil.Success(c)
}

func authCaptcha(c *gin.Context) {
	// 生成图片转Base64
	code := strconv.Itoa(encoders.Random().Intn(9000) + 1000)
	codeBts := []byte(code)
	img := captcha.NewImage(code, digitBytes(codeBts), 150, 50)

	var buffer bytes.Buffer
	encoder := base64.NewEncoder(base64.StdEncoding, &buffer)
	_, err := img.WriteTo(encoder)
	_ = encoder.Close()

	// 验证码加密后存储到JWT
	encodeAes, err := encriptor.AesEncrypt(codeBts, captchaAesKey)
	if ginutil.FailIfError(c, err) {
		return
	}
	encodeJwt, err := encriptor.GenTokenExpire(&encriptor.JwtData{
		Name: encoders.Base64EncodeString(encodeAes),
	}, config.JwtSecret, time.Now().Add(time.Minute*10))
	if ginutil.FailIfError(c, err) {
		return
	}

	ginutil.SuccessData(c, &CaptchaInfo{
		Encode: encodeJwt,
		Image:  string(buffer.Bytes()),
	})
}

func authLoginer(c *gin.Context) {
	user, _ := c.Get(consts.LoginUserKey)
	ginutil.SuccessData(c, user)
}

func digitBytes(input []byte) []byte {
	var res []byte
	for _, v := range input {
		if v <= '9' && v >= '0' {
			res = append(res, v-'0')
		}
	}
	return res
}
