package giner

import (
	"github.com/canuran/go-home/comm"
	"github.com/canuran/go-home/comm/consts"
	"github.com/canuran/go-home/comm/errorer"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"net/http"
)

func Success(c *gin.Context) {
	c.JSON(http.StatusOK, &comm.Response{})
}

func SuccessData(c *gin.Context, data any) {
	c.JSON(http.StatusOK, &comm.Response{Data: data})
}

func SuccessTotals(c *gin.Context, totals int64) {
	c.JSON(http.StatusOK, &comm.Response{Totals: totals})
}

func SuccessDataTotals(c *gin.Context, totals int64, data any) {
	c.JSON(http.StatusOK, &comm.Response{Totals: totals, Data: data})
}

func FailMessage(c *gin.Context, message string) {
	c.JSON(http.StatusOK, &comm.Response{Status: consts.CodeFailure, Message: message})
}

func FailStatusMessage(c *gin.Context, status int, message string) {
	c.JSON(http.StatusOK, &comm.Response{Status: status, Message: message})
}

func HandleError(c *gin.Context, err error) bool {
	if err != nil {
		logrus.Error(err)
		// StatusError 可以直接展示给用户
		if showErr, ok := err.(*errorer.StatusError); ok {
			c.JSON(http.StatusOK, &comm.Response{
				Status:  showErr.Status,
				Message: showErr.Error(),
			})
		} else {
			c.JSON(http.StatusOK, &comm.Response{
				Status:  consts.CodeFailure,
				Message: "操作失败",
			})
		}
		return true
	}
	return false
}
