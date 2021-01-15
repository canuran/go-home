package authapi

import (
	"bytes"
	"encoding/base64"
	"github.com/ewingtsai/go-web/authsrv/authjwt"
	"github.com/ewingtsai/go-web/usersrv/userapi"
	"github.com/ewingtsai/go-web/utils/encoders"
	"github.com/ewingtsai/go-web/utils/encriptor"
	"math/rand"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/dchest/captcha"
	"github.com/ewingtsai/go-web/common"
	"github.com/ewingtsai/go-web/usersrv/userbiz"
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
	var userParam userapi.UserVO
	err := c.ShouldBind(&userParam)
	if common.GinHandleErr(c, err) {
		return
	}
	// 获取并解析验证码
	captchaEncode := c.PostForm("captcha_encode")
	captchaCode := c.PostForm("captcha_code")
	claims, err := authjwt.ParseToken(captchaEncode)
	if err != nil {
		common.GinFailureMessage(c, "验证码过期")
		return
	}
	decode64 := encoders.Base64DecodeString(claims.Name)
	decodeAes, err := encriptor.AesDecrypt(decode64, captchaAesKey)
	if common.GinHandleErr(c, err) {
		return
	}
	if captchaCode != string(decodeAes) {
		common.GinFailureMessage(c, "验证码错误")
		return
	}
	// 校验用户名和密码是否正确
	user, err := userbiz.GetUserByName(c, userParam.Name)
	if common.GinHandleErr(c, err) {
		return
	}
	if user == nil {
		common.GinFailureMessage(c, "登录用户不存在")
		return
	}
	if len(user.Password) < 1 {
		common.GinFailureMessage(c, "用户未设置密码")
		return
	}
	// 密码混淆加强
	pwdMd5 := encoders.Md5String([]byte(user.Password + captchaEncode))
	if userParam.Password == pwdMd5 {
		// 登陆版本号增加
		user.LoginVersion++
		err = userbiz.UpdateLoginIndex(c, user)
		if common.GinHandleErr(c, err) {
			return
		}
		// 生成Token
		tokenStr, err := authjwt.GenToken(&authjwt.JwtData{
			ID:      user.ID,
			Name:    user.Name,
			Version: user.LoginVersion,
		})
		if common.GinHandleErr(c, err) {
			return
		}
		c.Header("Set-Cookie", "Authorization="+tokenStr)
		common.GinSuccessData(c, tokenStr)
		return
	}
	common.GinFailureMessage(c, "用户名或密码错误")
}

func authLogout(c *gin.Context) {
	loginUser, ok := c.Get(common.LoginUserKey)
	if ok && loginUser != nil {
		// 登陆版本号增加
		user := loginUser.(*userbiz.UserBO)
		user.LoginVersion++
		err := userbiz.UpdateLoginIndex(c, user)
		if common.GinHandleErr(c, err) {
			return
		}
	}
	c.Header("Set-Cookie", "Authorization=none")
	common.GinSuccess(c)
}

func authCaptcha(c *gin.Context) {
	// 生成图片转Base64
	code := strconv.Itoa(rand.Intn(8888) + 1000)
	img := captcha.NewImage(code, digitBytes([]rune(code)), 150, 50)
	var buffer bytes.Buffer
	encoder := base64.NewEncoder(base64.StdEncoding, &buffer)
	_, err := img.WriteTo(encoder)
	_ = encoder.Close()

	// 验证码加密后存储到JWT
	encodeAes, err := encriptor.AesEncrypt([]byte(code), captchaAesKey)
	if common.GinHandleErr(c, err) {
		return
	}
	encodeJwt, err := authjwt.GenTokenExpire(&authjwt.JwtData{
		Name: encoders.Base64EncodeString(encodeAes),
	}, time.Now().Add(time.Minute*10))
	if common.GinHandleErr(c, err) {
		return
	}
	common.GinSuccessData(c, &common.CaptchaInfo{
		Encode: encodeJwt,
		Image:  string(buffer.Bytes()),
	})
}

func authLoginer(c *gin.Context) {
	user, _ := c.Get(common.LoginUserKey)
	common.GinSuccessData(c, user)
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
		if common.LogIfErr(err) {
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
	if common.LogIfErr(err) {
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
	if common.LogIfErr(err) {
		unauthorized(c)
		return
	}
	if user == nil {
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

func digitBytes(input []rune) []byte {
	var res []byte
	for _, v := range input {
		if v <= '9' && v >= '0' {
			res = append(res, byte(v-'0'))
		}
	}
	return res
}
