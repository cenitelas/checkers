import React,{ Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './LoginForm';
import Game from './Game';
import GamesList from './GamesList';
import Modal from './Modal';
import Select from 'react-select'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          user:{},
          player:{CheckTypeId:0},
          modal:null,
          game:{GameTypeId:0}

      }
      this.ChangeUser = this.ChangeUser.bind(this);
      this.ShowModal = this.ShowModal.bind(this);
      this.CloseModal = this.CloseModal.bind(this);
      this.CreateGame = this.CreateGame.bind(this);
      this.SendNewGame = this.SendNewGame.bind(this);
    }

    ChangeUser(user){
      fetch("/api/player/GetPlayerUser/"+user.Id)
      .then(request => request.json())
      .then(result => result!=null && this.setState({player:result}))
      .catch(function(res){ console.log(res) });
      this.setState({user:user});;
    }

    ShowModal(message){
      this.setState({modal:message});
    }

    CloseModal(){
      this.setState({modal:null});
    }

    CreateGame(){
     var optionsGameType = [
      { value: 1, label: 'Русские шашки' },
      { value: 2, label: 'Поддавки' }
    ]
    var optionsCheckType = [
      { value: 1, label: 'Белые' },
      { value: 2, label: 'Черные' }
    ]
     var message = (
        <div className="create-game">
          <label>Тип игры</label>
          <Select defaultValue={optionsGameType[0]} value={optionsGameType[this.state.game.GameTypeId-1]} options={optionsGameType} onChange={(e)=>{this.setState({game:{GameTypeId:e.value}});}}/>
          <label>Цвет шашек</label>
          <Select defaultValue={optionsCheckType[0]} value={optionsCheckType[this.state.game.GameTypeId-1]} options={optionsCheckType} onChange={(e)=>{this.setState({player:{CheckTypeId:e.value}});}}/>
          <button onClick={this.SendNewGame}>Create</button>
        </div>
      )
    this.setState({modal:message});
    }

    SendNewGame(){
        var game = this.state.game;
        var player = this.state.player;
        this.setState({player:{UserId:this.state.user.Id}});
      if(game.GameTypeId!=0)
        game.GameTypeId=1;
      if(player.CheckTypeId!=0)       
        game.CountPlayers=1;
        game.HostId=player.UserId;
        game.isFinish=false;
        fetch("/api/game/postgame",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(game)
        })
        .then(request => request.json())
        .then(result => this.setState({game:result}))
        .catch(function(res){ console.log(res) })
        this.setState({player:{CheckTypeId:1}});
        this.setState({player:{GameId:game.Id}});
        
        fetch("/api/player/postplayer",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(player)
        })
        .then(request => request.json())
        .then(result => this.setState({player:result}))
        .catch(function(res){ console.log(res) })
    }


    render() {
      var player = this.state.player;
      if(player && player.Game)
        return <Game game={player.Game}></Game>
      else
        return (
          <div className="app">
            {this.state.modal && 
               <Modal key="1" message={this.state.modal}></Modal>
            }
            {!this.state.user.Id &&
              <LoginForm ChangeUser={this.ChangeUser}></LoginForm>
            }
            {this.state.user.Id &&
                <content>
                   <GamesList></GamesList>
                   <button onClick={this.CreateGame}>Create game</button>
                </content>  
              }          
          </div>
        )
    }
}

export default App;
