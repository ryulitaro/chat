
class websocketConn {
    constructor() {
        this.websocket = new WebSocket('ws://127.0.0.1:3030/ws')
        this.connect()
    }

    connect() {
        this.websocket.onopen = function () {
            console.log('Connected');
        };
        this.websocket.onclose = function () {
            console.log('Closed');
        };
        this.websocket.onmessage = function (message) {
            let data = JSON.parse(message.data)
            console.log('Message Received: ', data)
        }
    }

    addListener(listner) {
        console.log('addListener')
        this.websocket.addEventListener("message", (message) => {
            let data = JSON.parse(message.data)
            listner(data)
        })
    }

    sendMessage(message) {
        console.log('sendMessage')
        this.websocket.send(message)
    }
}

export default websocketConn; 