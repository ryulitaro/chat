import React from 'react';

class Receiver extends React.Component {
    render() {
        return (
            <div id="receiver" className="row">
                <div className="col-8" >
                </div>
                <div className="col-3" style={{ backgroundColor: '#fae0fd' }} >
                    <h5>{this.props.message}</h5>
                </div>
                <div className="col-1" style={{ backgroundColor: '#e8cceb' }}>
                    <h5>{this.props.name}</h5>
                </div>
            </div>
        )
    }
}

class Sender extends React.Component {
    render() {
        return (
            <div id="sender" className="row">
                <div className="col-1" style={{ backgroundColor: '#b4c1db' }} >
                    <h5>{this.props.name}</h5>
                </div>
                <div className="col-3" style={{ backgroundColor: '#c8d6f1' }}>
                    <h5>{this.props.message}</h5>
                </div>
                <div className="col-8" >
                </div>
            </div>
        )
    }
}


class Chat extends React.Component {
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        let messageList = this.props.messageList
        let myName = this.props.myName
        const chatList = []
        if (this.props.visible) {
            var key
            for (key in messageList) {
                let message = messageList[key]
                if (message.sender == myName) {
                    chatList.push(<Receiver name={message.sender} message={message.payload} />)
                } else {
                    chatList.push(<Sender name={message.sender} message={message.payload} />)
                }
            }
        }

        return (
            <div id="chat" className="p-3 container-fluid bg-white" style={{ height: '500px', overflow: 'auto', visibility: this.props.visible }}>
                {chatList}
                <div style={{ float: "left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        );
    }
}


export default Chat;