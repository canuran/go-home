package router

import (
	"log"
	"net/http"

	"github.com/ewingtsai/go-web/common"
	"github.com/gin-gonic/gin"
)

func success(c *gin.Context) {
	c.JSON(http.StatusOK, &common.Response{})
}

func successData(c *gin.Context, data interface{}) {
	c.JSON(http.StatusOK, &common.Response{Data: data})
}

func successTotals(c *gin.Context, totals int64) {
	c.JSON(http.StatusOK, &common.Response{Totals: totals})
}

func successAll(c *gin.Context, totals int64, data interface{}) {
	c.JSON(http.StatusOK, &common.Response{Totals: totals, Data: data})
}

func failureMessage(c *gin.Context, message string) {
	c.JSON(http.StatusOK, &common.Response{Code: common.CodeFailure, Message: message})
}

func handleErr(c *gin.Context, err error) bool {
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusOK, &common.Response{
			Code:    common.CodeFailure,
			Message: err.Error(),
		})
		return true
	}
	return false
}
