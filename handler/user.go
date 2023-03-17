package handler

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"github.com/canuran/go-home/comm/giner"
	"github.com/canuran/go-home/dal"
	"github.com/canuran/go-home/service"
	"github.com/canuran/go-home/utils/codec"
	"github.com/canuran/go-home/utils/imager"
	"github.com/canuran/go-home/utils/stringer"
	"github.com/canuran/go-home/utils/valuer"
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

type UserQuery struct {
	ID         int64  `json:"id,omitempty" form:"id"`
	Name       string `json:"name,omitempty" form:"name"`
	Gender     string `json:"gender,omitempty" form:"gender"`
	Conditions string `json:"conditions,omitempty" form:"conditions"`
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
	giner.SuccessData(c, stringer.FormatSpaceRunes([]rune(name)))
}

func saveUser(c *gin.Context) {
	user := &UserVO{}
	err := c.ShouldBind(user)
	if giner.HandleError(c, err) {
		return
	}

	headerImg, err := c.FormFile("header_file")
	if err == nil {
		headerFile, err := headerImg.Open()
		if giner.HandleError(c, err) {
			return
		}

		var buffer bytes.Buffer
		err = imager.ConvertImage(&imager.ConvertOption{
			Reader:     headerFile,
			NewWidth:   200,
			NewHeight:  200,
			Writer:     &buffer,
			OutFormat:  "jpg",
			JpgMaxSize: base64.StdEncoding.DecodedLen(service.MaxHeaderSize),
		})
		if giner.HandleError(c, err) {
			return
		}

		bts := buffer.Bytes()
		user.Header = string(codec.Base64Encode(bts))
	}
	err = service.SaveUser(c, UserVO2BO(user))
	if giner.HandleError(c, err) {
		return
	}
	giner.Success(c)
}

func queryUser(c *gin.Context) {
	user := &UserQuery{}
	err := c.ShouldBind(user)
	if giner.HandleError(c, err) {
		return
	}

	param := &dal.QueryUserParam{
		IdEq:         user.ID,
		NameEq:       user.Name,
		GenderEq:     user.Gender,
		OmitPassword: true,
	}
	if len(user.Conditions) > 5 {
		err = json.Unmarshal([]byte(user.Conditions), &param.Conditions)
		if giner.HandleError(c, err) {
			return
		}
	}

	if c.PostForm("count") == "true" {
		totals, err := service.CountUser(c, param)
		if giner.HandleError(c, err) {
			return
		}
		giner.SuccessTotals(c, totals)
		return
	}

	cPage := c.DefaultPostForm("cPage", "1")
	pSize := c.DefaultPostForm("pSize", "10")
	limit := int(valuer.Int64ify(pSize))
	offset := int(valuer.Int64ify(cPage))*limit - limit
	users, err := service.QueryUser(c, param, offset, limit)
	if giner.HandleError(c, err) {
		return
	}
	userVos := make([]*UserVO, 0, len(users))
	for _, userBo := range users {
		userVos = append(userVos, UserBO2VO(userBo))
	}
	giner.SuccessData(c, userVos)
}

func deleteUser(c *gin.Context) {
	user := &UserVO{}
	err := c.ShouldBind(user)
	if giner.HandleError(c, err) {
		return
	}
	err = service.DeleteUser(c, UserVO2BO(user))
	if giner.HandleError(c, err) {
		return
	}
	giner.Success(c)
}
