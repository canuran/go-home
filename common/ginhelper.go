package common

import (
	log "github.com/sirupsen/logrus"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GinSuccess(c *gin.Context) {
	c.JSON(http.StatusOK, &Response{})
}

func GinSuccessData(c *gin.Context, data interface{}) {
	c.JSON(http.StatusOK, &Response{Data: data})
}

func GinSuccessTotals(c *gin.Context, totals int64) {
	c.JSON(http.StatusOK, &Response{Totals: totals})
}

func GinSuccessAll(c *gin.Context, totals int64, data interface{}) {
	c.JSON(http.StatusOK, &Response{Totals: totals, Data: data})
}

func GinFailureMessage(c *gin.Context, message string) {
	c.JSON(http.StatusOK, &Response{Code: CodeFailure, Message: message})
}

func GinHandleErr(c *gin.Context, err error) bool {
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusOK, &Response{
			Code:    CodeFailure,
			Message: err.Error(),
		})
		return true
	}
	return false
}
