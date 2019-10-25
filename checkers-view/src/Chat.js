import React from 'react';
import logo from './logo.svg';
import './Chat.css';

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id:props.id,
            chat:{},
            message:"",
            user:props.user
        }
        this.SendMessage = this.SendMessage.bind(this);
    }

    componentDidMount(){
        this.intervalP = setInterval(async () =>{
            var chat = this.state.chat;
            var res = await fetch('/api/chat/getchat/'+this.state.id);
            var rej = await res.json()
            if(JSON.stringify(rej)!=JSON.stringify(chat) && rej){
                this.setState({chat:rej});
            }
        }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.intervalP);
    }

    async SendMessage(){
        var chat = this.state.chat;
        var message = this.state.message;
        var user = this.state.user;
        if(message.length>0){
            chat.Id=this.state.Id;
        if(!chat.Messages){
            chat.Messages=[];
        }
        chat.Messages.push(user.Name+" > "+this.state.message);
        await fetch("/api/chat/postchat",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(chat)
        });
        this.setState({chat:chat});
        this.setState({message:""});
        }
    }

    render() {
        var chat = this.state.chat;
        return (
          <div className="chat">
              <div className="messages">
              {chat && chat.Messages &&
                chat.Messages.map((item)=>
                    <p key={Math.random()*0.001}>{item}</p>
                )
              }
              </div>
              <div className="message">
              <input value={this.state.message} onChange={(e)=>this.setState({message:e.target.value})}></input>
              <button onClick={this.SendMessage}>Отправить</button>
              </div>
          </div>
        )
    }
}

export default Chat;