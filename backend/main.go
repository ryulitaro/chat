package main

import (
	"backend/iot"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"gopkg.in/olahol/melody.v1"
)

func main() {
	router := gin.Default()
	websocket := melody.New()
	iotClient, _ := iot.IoTClient("client_kiki", "client_jiji", websocket)
	iotClient.ListenMessage()

	router.GET("/ws", func(c *gin.Context) {
		websocket.HandleRequest(c.Writer, c.Request)
	})

	websocket.HandleMessage(func(s *melody.Session, msg []byte) {
		iotClient.SendMessage(msg)
	})

	router.Use(static.Serve("/", static.LocalFile("../front/build", true)))

	router.Run(":3030")
}
