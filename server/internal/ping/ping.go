package ping

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func POST(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "pong"})
}

func GET(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "pong"})
}
