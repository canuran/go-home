package ginutil

import (
	"github.com/ewingtsai/go-home/common"
	"github.com/ewingtsai/go-home/common/consts"
	"github.com/ewingtsai/go-home/common/errutil"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"net/http"
)

func Success(c *gin.Context) {
	c.JSON(http.StatusOK, &common.Response{})
}

func SuccessData(c *gin.Context, data any) {
	c.JSON(http.StatusOK, &common.Response{Data: data})
}

func SuccessTotals(c *gin.Context, totals int64) {
	c.JSON(http.StatusOK, &common.Response{Totals: totals})
}

func SuccessDataTotals(c *gin.Context, totals int64, data any) {
	c.JSON(http.StatusOK, &common.Response{Totals: totals, Data: data})
}

func FailMessage(c *gin.Context, message string) {
	c.JSON(http.StatusOK, &common.Response{Code: consts.CodeFailure, Message: message})
}

func FailCodeMessage(c *gin.Context, code int, message string) {
	c.JSON(http.StatusOK, &common.Response{Code: code, Message: message})
}

func HandleError(c *gin.Context, err error) bool {
	if err != nil {
		logrus.Error(err)
		// ShowErr 可以直接展示给用户
		if showErr, ok := err.(errutil.ShowErr); ok {
			c.JSON(http.StatusOK, &common.Response{
				Code:    showErr.Code,
				Message: showErr.Error(),
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
