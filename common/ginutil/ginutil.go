package ginutil

import (
	"github.com/ewingtsai/go-web/common"
	"github.com/ewingtsai/go-web/common/consts"
	"github.com/ewingtsai/go-web/common/showerr"
	log "github.com/sirupsen/logrus"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Success(c *gin.Context) {
	c.JSON(http.StatusOK, &common.Response{})
}

func SuccessData(c *gin.Context, data interface{}) {
	c.JSON(http.StatusOK, &common.Response{Data: data})
}

func SuccessTotals(c *gin.Context, totals int64) {
	c.JSON(http.StatusOK, &common.Response{Totals: totals})
}

func SuccessResponse(c *gin.Context, totals int64, data interface{}) {
	c.JSON(http.StatusOK, &common.Response{Totals: totals, Data: data})
}

func FailMessage(c *gin.Context, message string) {
	c.JSON(http.StatusOK, &common.Response{Code: consts.CodeFailure, Message: message})
}

func FailIfError(c *gin.Context, err error) bool {
	if err != nil {
		log.Println(err)
		// 只有 ShowErr 可以直接展示给用户
		if he, ok := err.(showerr.ShowErr); ok {
			c.JSON(http.StatusOK, &common.Response{
				Code:    he.Code,
				Message: he.Error(),
			})
		} else {
			c.JSON(http.StatusOK, &common.Response{
				Code:    consts.CodeFailure,
				Message: "操作失败",
			})
		}
		return true
	}
	return false
}
