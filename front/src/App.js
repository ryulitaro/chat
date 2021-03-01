import './App.css';
import React from 'react';
import Chat from './Chat';
import websocket from './index'

let nameInput = React.createRef();
let messageInput = React.createRef();

class Input extends React.Component {
  render() {
    return (
      <form className="p-3 form-inline" onSubmit={this.props.onSubmit}>
        <label className="mr-sm-2" htmlFor="message">
          <h5>Message:</h5>
        </label>
        <input ref={messageInput} className="form-control mb-2 mr-sm-2" placeholder="Enter message" type="text" id="message" />
      </form>
    )
  }
}

class Name extends React.Component {
  render() {
    return (
      <form className="form-inline" onSubmit={this.props.onSubmit}>
        <label className="mr-sm-2" htmlFor="usr">
          <h5>Name:</h5>
        </label>
        <input ref={nameInput} className="form-control mb-2 mr-sm-2" placeholder="Enter name" type="text" id="usr" />
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      messageList: [],
    }
  }

  componentDidMount() {
    setTimeout(() => {
      websocket.addListener(this.messageListener)
    }, 250)
  }

  addMessage = (message) => {
    let messageList = this.state.messageList.slice()
    messageList.push(message)
    this.setState({
      messageList: messageList
    })
  }

  messageListener = (message) => {
    this.addMessage(message)
  }

  handleMessage = (e) => {
    e.preventDefault();
    let messageList = this.state.messageList.slice()
    let message = {
      payload: messageInput.current.value,
      sender: nameInput.current.value
    }
    console.log(message.payload)
    messageList.push(message)

    this.setState({
      messageList: messageList
    })
    websocket.sendMessage(JSON.stringify(message))
  }

  handleStart = (e) => {
    e.preventDefault();
    this.setState({
      name: nameInput.current.value,
      visible: true
    })
  }

  render() {
    return (
      <div className="container-fluid" >
        <div className="container-fluid text-white" style={{ backgroundColor: 'rgb(43, 38, 44)' }}>
          <h1 style={{ color: '#fffdc2' }}> Let's Chat</h1>
          <Name onSubmit={this.handleStart} />
          {this.state.visible ? < Chat visible={this.state.visible} messageList={this.state.messageList} myName={nameInput.current.value} /> : null}
          {this.state.visible ? <Input visible={this.state.visible} onSubmit={this.handleMessage} /> : null}
        </div>
      </div>
    );
  }
}

export default App;
