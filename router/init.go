package router

import (
	"log"
	"net/http"

	"github.com/ewingtsai/go-web/common"
	"github.com/ewingtsai/go-web/model"
	"github.com/gin-gonic/gin"
)

func success(c *gin.Context) {
	c.JSON(http.StatusOK, &model.Response{})
}

func successData(c *gin.Context, data interface{}) {
	c.JSON(http.StatusOK, &model.Response{Data: data})
}

func successTotals(c *gin.Context, totals int64) {
	c.JSON(http.StatusOK, &model.Response{Totals: totals})
}

func successAll(c *gin.Context, totals int64, data interface{}) {
	c.JSON(http.StatusOK, &model.Response{Totals: totals, Data: data})
}

func handleErr(c *gin.Context, err error) bool {
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusOK, &model.Response{
			Code:    common.CodeFailure,
			Message: err.Error(),
		})
		return true
	}
	return false
}
