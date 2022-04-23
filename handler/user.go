package handler

import (
	"bytes"
	"github.com/ewingtsai/go-web/common/ginutil"
	"github.com/ewingtsai/go-web/service"
	"github.com/ewingtsai/go-web/utils/converter"
	"github.com/ewingtsai/go-web/utils/encoders"
	"github.com/ewingtsai/go-web/utils/imager"
	"github.com/ewingtsai/go-web/utils/stringer"
	"github.com/gin-gonic/gin"
	"time"
)

type UserVO struct {
	ID        int64     `json:"id,omitempty" form:"id"`
	Name      string    `json:"name,omitempty" form:"name"`
	Password  string    `json:"password,omitempty" form:"password"`
	Header    string    `json:"header,omitempty" gorm:"size:5120"` // 存储很小的头像
	Gender    string    `json:"gender,omitempty" form:"gender"`
	Role      string    `json:"role,omitempty" form:"role"`
	Status    int64     `json:"status,omitempty" form:"status"`
	Sign      string    `json:"sign,omitempty" form:"sign"`
	UpdatedAt time.Time `json:"updated_at,omitempty"`
}

func UserVO2BO(bo *UserVO) *service.UserBO {
	if bo == nil {
		return nil
	}
	return &service.UserBO{
		ID:        bo.ID,
		Name:      bo.Name,
		Password:  bo.Password,
		Header:    bo.Header,
		Gender:    bo.Gender,
		Role:      bo.Role,
		Status:    bo.Status,
		Sign:      bo.Sign,
		UpdatedAt: bo.UpdatedAt,
	}
}

func UserBO2VO(po *service.UserBO) *UserVO {
	if po == nil {
		return nil
	}
	return &UserVO{
		ID:        po.ID,
		Name:      po.Name,
		Password:  po.Password,
		Header:    po.Header,
		Gender:    po.Gender,
		Role:      po.Role,
		Status:    po.Status,
		Sign:      po.Sign,
		UpdatedAt: po.UpdatedAt,
	}
}

// User 用户
func User(group *gin.RouterGroup) {
	// 注册路由
	group.POST("user/save", saveUser)
	group.POST("user/query", queryUser)
	group.POST("user/delete", deleteUser)
	group.POST("filter_name", filterName)
}

func filterName(c *gin.Context) {
	name := c.PostForm("name")
	ginutil.SuccessData(c, stringer.StandardizeRunes([]rune(name)))
}

func saveUser(c *gin.Context) {
	user := &UserVO{}
	err := c.ShouldBind(user)
	if ginutil.FailIfError(c, err) {
		return
	}
	headerImg, err := c.FormFile("header_file")
	if err == nil {
		headerFile, err := headerImg.Open()
		if ginutil.FailIfError(c, err) {
			return
		}
		var buffer bytes.Buffer
		err = imager.ConvertImage(&imager.ConvertOption{
			Reader:        headerFile,
			NewWidth:      100,
			NewHeight:     100,
			Writer:        &buffer,
			OutFormat:     "jpg",
			MaxJpgOutByte: service.MaxHeaderSize*0.75 - 20,
		})
		if ginutil.FailIfError(c, err) {
			return
		}
		bts := buffer.Bytes()
		user.Header = string(encoders.Base64Encode(bts))
	}
	err = service.SaveUser(c, UserVO2BO(user))
	if ginutil.FailIfError(c, err) {
		return
	}
	ginutil.Success(c)
}

func queryUser(c *gin.Context) {
	user := &UserVO{}
	err := c.ShouldBind(user)
	if ginutil.FailIfError(c, err) {
		return
	}

	if c.PostForm("count") == "true" {
		totals, err := service.CountUser(c, UserVO2BO(user))
		if ginutil.FailIfError(c, err) {
			return
		}
		ginutil.SuccessTotals(c, totals)
		return
	}

	cPage := c.DefaultPostForm("cPage", "1")
	pSize := c.DefaultPostForm("pSize", "10")
	limit := int(converter.Int64ify(pSize))
	offset := int(converter.Int64ify(cPage))*limit - limit
	users, err := service.QueryUser(c, UserVO2BO(user), offset, limit)
	if ginutil.FailIfError(c, err) {
		return
	}
	ginutil.SuccessData(c, users)
}

func deleteUser(c *gin.Context) {
	user := &UserVO{}
	err := c.ShouldBind(user)
	if ginutil.FailIfError(c, err) {
		return
	}
	err = service.DeleteUser(c, UserVO2BO(user))
	if ginutil.FailIfError(c, err) {
		return
	}
	ginutil.Success(c)
}
