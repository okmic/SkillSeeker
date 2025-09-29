package main

import (
	"log"

	"app/internal/ping"
	"app/pkg/config"

	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.Load()

	router := gin.Default()

	registerRoutes(router)

	log.Printf("Starting server on %s", cfg.ServerAddress)
	if err := router.Run(cfg.ServerAddress); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}

func registerRoutes(router *gin.Engine) {
	router.GET("/", func(c *gin.Context) {
		ping.GET(c)
	})
	router.POST("/ping", func(c *gin.Context) {
		ping.POST(c)
	})
	router.GET("/ping", func(c *gin.Context) {
		ping.GET(c)
	})
}
