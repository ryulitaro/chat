package iot

import (
	"fmt"
	"time"

	mqtt "github.com/eclipse/paho.mqtt.golang"
	"gopkg.in/olahol/melody.v1"
)

var connectHandler mqtt.OnConnectHandler = func(client mqtt.Client) {
	fmt.Println("Connected")
}

var connectLostHandler mqtt.ConnectionLostHandler = func(client mqtt.Client, err error) {
	fmt.Printf("Connect lost: %v", err)
}

type IotClient struct {
	mqttClient     mqtt.Client
	publishTopic   string
	subscribeTopic string
	websocket      *melody.Melody
}

func IoTClient(clientId string, targetId string, websocket *melody.Melody) (*IotClient, error) {
	var broker = "127.0.0.1"
	var port = 1883
	opts := mqtt.NewClientOptions()
	opts.AddBroker(fmt.Sprintf("mqtt://%s:%d", broker, port))
	opts.SetClientID(clientId)
	opts.SetConnectTimeout(30 * time.Second)
	opts.OnConnect = connectHandler
	opts.OnConnectionLost = connectLostHandler
	client := mqtt.NewClient(opts)
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		panic(token.Error())
	}
	iotClient := &IotClient{
		mqttClient:     client,
		publishTopic:   "topic/" + targetId,
		subscribeTopic: "topic/" + clientId,
		websocket:      websocket,
	}
	return iotClient, nil
}

func (i *IotClient) ListenMessage() {
	var messageSubHandler mqtt.MessageHandler = func(client mqtt.Client, msg mqtt.Message) {
		i.websocket.Broadcast(msg.Payload())
	}
	if token := i.mqttClient.Subscribe(i.subscribeTopic, 0, messageSubHandler); token.Wait() && token.Error() != nil {
		panic(token.Error())
	}
}

func (i *IotClient) SendMessage(payload []byte) error {
	if token := i.mqttClient.Publish(i.publishTopic, 0, false, payload); token.Wait() && token.Error() != nil {
		return token.Error()
	}
	return nil
}
