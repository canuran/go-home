package giner

import (
	"github.com/ewingtsai/go-web/common"
	"github.com/ewingtsai/go-web/common/consts"
	"github.com/ewingtsai/go-web/common/hinterr"
	log "github.com/sirupsen/logrus"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GinSuccess(c *gin.Context) {
	c.JSON(http.StatusOK, &common.Response{})
}

func GinSuccessData(c *gin.Context, data interface{}) {
	c.JSON(http.StatusOK, &common.Response{Data: data})
}

func GinSuccessTotals(c *gin.Context, totals int64) {
	c.JSON(http.StatusOK, &common.Response{Totals: totals})
}

func GinSuccessAll(c *gin.Context, totals int64, data interface{}) {
	c.JSON(http.StatusOK, &common.Response{Totals: totals, Data: data})
}

func GinFailureMessage(c *gin.Context, message string) {
	c.JSON(http.StatusOK, &common.Response{Code: consts.CodeFailure, Message: message})
}

func GinHandleErr(c *gin.Context, err error) bool {
	if err != nil {
		log.Println(err)
		// 只有 HintErr 可以直接展示给用户
		if he, ok := err.(hinterr.HintErr); ok {
			c.JSON(http.StatusOK, &common.Response{
				Code:    he.Code,
				Message: he.Error(),
			})
		} else {
			c.JSON(http.StatusOK, &common.Response{
				Code:    consts.CodeFailure,
				Message: "处理失败了",
			})
		}
		return true
	}
	return false
}
