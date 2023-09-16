package codec

import (
	"errors"
	"github.com/golang-jwt/jwt/v5"
	"time"
)

const (
	DefaultJwtExpire = time.Hour * 720
)

type JwtData struct {
	UID     int64  `json:"uid,omitempty"`
	Name    string `json:"name,omitempty"`
	Version int64  `json:"version,omitempty"`
}

type JwtClaims struct {
	jwt.RegisteredClaims
	*JwtData
}

func GetExpireDate() time.Time {
	return time.Now().Add(DefaultJwtExpire)
}

// GenToken 生成JWT
func GenToken(data *JwtData, secret []byte) (string, error) {
	return GenTokenExpire(data, secret, GetExpireDate())
}

func GenTokenExpire(data *JwtData, secret []byte, expire time.Time) (string, error) {
	// 创建一个我们自己的声明
	c := JwtClaims{
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expire), // 过期时间
		},
		JwtData: data, // 自定义字段
	}
	// 使用指定的签名方法创建签名对象
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, c)
	// 使用指定的secret签名并获得完整的编码后的字符串token
	return token.SignedString(secret)
}

// ParseToken 解析JWT
func ParseToken(tokenStr string, secret []byte) (*JwtClaims, error) {
	// 解析token
	token, err := jwt.ParseWithClaims(tokenStr, &JwtClaims{},
		func(token *jwt.Token) (i any, err error) {
			return secret, nil
		})
	if err != nil {
		return nil, err
	}
	// 校验token
	if claims, ok := token.Claims.(*JwtClaims); ok && token.Valid {
		return claims, nil
	}
	return nil, errors.New("invalid jwt token")
}
