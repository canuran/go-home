package userweb

import (
	"bytes"
	"github.com/ewingtsai/go-web/common"
	"github.com/ewingtsai/go-web/userserver/userservice"
	"github.com/ewingtsai/go-web/utils"
	"github.com/gin-gonic/gin"
	"time"
)

type UserVO struct {
	ID           int64     `json:"id,omitempty" form:"id"`
	Name         string    `json:"name,omitempty" form:"name"`
	Password     string    `json:"password,omitempty" form:"password"`
	Header       string    `json:"header,omitempty" gorm:"size:5120"` // 存储很小的头像
	Gender       string    `json:"gender,omitempty" form:"gender"`
	Role         string    `json:"role,omitempty" form:"role"`
	Status       int       `json:"status,omitempty" form:"status"`
	Sign         string    `json:"sign,omitempty" form:"sign"`
	UpdatedAt    time.Time `json:"updated_at,omitempty"`
}

func UserVO2BO(bo *UserVO) *userservice.UserBO {
	if bo == nil {
		return nil
	}
	return &userservice.UserBO{
		ID:           bo.ID,
		Name:         bo.Name,
		Password:     bo.Password,
		Header:       bo.Header,
		Gender:       bo.Gender,
		Role:         bo.Role,
		Status:       bo.Status,
		Sign:         bo.Sign,
		UpdatedAt:    bo.UpdatedAt,
	}
}

func UserBO2VO(po *userservice.UserBO) *UserVO {
	if po == nil {
		return nil
	}
	return &UserVO{
		ID:           po.ID,
		Name:         po.Name,
		Password:     po.Password,
		Header:       po.Header,
		Gender:       po.Gender,
		Role:         po.Role,
		Status:       po.Status,
		Sign:         po.Sign,
		UpdatedAt:    po.UpdatedAt,
	}
}

// User 用户
func User(group *gin.RouterGroup) {
	// 注册路由
	group.POST("user/save", saveUser)
	group.GET("user/query", queryUser)
	group.POST("user/delete", deleteUser)
	group.GET("filter_name", filterName)
}

func filterName(c *gin.Context) {
	name := c.Query("name")
	common.GinSuccessData(c, utils.StandardizeRunes([]rune(name)))
}

func saveUser(c *gin.Context) {
	user := &UserVO{}
	err := c.ShouldBind(user)
	if common.GinHandleErr(c, err) {
		return
	}
	headerImg, err := c.FormFile("header_file")
	if err == nil {
		headerFile, err := headerImg.Open()
		if common.GinHandleErr(c, err) {
			return
		}
		var buffer bytes.Buffer
		err = utils.ConvertImage(&utils.ConvertOption{
			Reader:        headerFile,
			NewWidth:      100,
			NewHeight:     100,
			Writer:        &buffer,
			OutFormat:     "jpg",
			MaxJpgOutByte: userservice.MaxHeaderSize*0.75 - 20,
		})
		if common.GinHandleErr(c, err) {
			return
		}
		bts := buffer.Bytes()
		user.Header = string(utils.Base64Encode(bts))
	}
	err = userservice.SaveUser(c, UserVO2BO(user))
	if common.GinHandleErr(c, err) {
		return
	}
	common.GinSuccess(c)
}

func queryUser(c *gin.Context) {
	user := &UserVO{}
	err := c.ShouldBindQuery(user)
	if common.GinHandleErr(c, err) {
		return
	}

	if c.Query("count") == "true" {
		totals, err := userservice.CountUser(c, UserVO2BO(user))
		if common.GinHandleErr(c, err) {
			return
		}
		common.GinSuccessTotals(c, totals)
		return
	}

	cPage := c.DefaultQuery("cPage", "1")
	pSize := c.DefaultQuery("pSize", "10")
	limit := int(utils.Int64ify(pSize))
	offset := int(utils.Int64ify(cPage))*limit - limit
	users, err := userservice.QueryUser(c, UserVO2BO(user), offset, limit)
	if common.GinHandleErr(c, err) {
		return
	}
	common.GinSuccessData(c, users)
}

func deleteUser(c *gin.Context) {
	user := &UserVO{}
	err := c.ShouldBind(user)
	if common.GinHandleErr(c, err) {
		return
	}
	err = userservice.DeleteUser(c, UserVO2BO(user))
	if common.GinHandleErr(c, err) {
		return
	}
	common.GinSuccess(c)
}
