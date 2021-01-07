package util

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"time"
)

const (
	JwtClaimsKey     = "JsonWebClaims"
	DefaultJwtExpire = time.Hour * 720
)

var JwtSecret = []byte("MySecret")

type JwtClaims struct {
	jwt.StandardClaims
	Name string `json:"name"`
}

func GetExpireDate() time.Time {
	return time.Now().Add(DefaultJwtExpire)
}

// GenToken 生成JWT
func GenToken(name string) (string, error) {
	return GenTokenExpire(name, GetExpireDate())
}

func GenTokenExpire(name string, expire time.Time) (string, error) {
	// 创建一个我们自己的声明
	c := JwtClaims{
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expire.Unix(), // 过期时间
		},
		Name: name, // 自定义字段
	}
	// 使用指定的签名方法创建签名对象
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, c)
	// 使用指定的secret签名并获得完整的编码后的字符串token
	return token.SignedString(JwtSecret)
}

// ParseToken 解析JWT
func ParseToken(tokenStr string) (*JwtClaims, error) {
	// 解析token
	token, err := jwt.ParseWithClaims(tokenStr, &JwtClaims{},
		func(token *jwt.Token) (i interface{}, err error) {
			return JwtSecret, nil
		})
	if err != nil {
		return nil, err
	}
	// 校验token
	if claims, ok := token.Claims.(*JwtClaims); ok && token.Valid {
		return claims, nil
	}
	return nil, fmt.Errorf("invalid json web token")
}
