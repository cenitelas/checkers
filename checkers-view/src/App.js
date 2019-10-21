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
          player:{CheckTypeId:1},
          modal:null,
          game:{GameTypeId:1}

      }
      this.ChangeUser = this.ChangeUser.bind(this);
      this.ShowModal = this.ShowModal.bind(this);
      this.CloseModal = this.CloseModal.bind(this);
      this.CreateGame = this.CreateGame.bind(this);
      this.SendNewGame = this.SendNewGame.bind(this);
      this.JoinGame = this.JoinGame.bind(this);
    }

    async ChangeUser(user){
      var  response =  await fetch("/api/player/GetPlayerUser/"+user.Id);
      var  player =  await response.json();
      if(player){
      var response2 =  await fetch("/api/player/getplayer/"+player.Id);
      var player2 =  await response2.json();  
      console.log(player2);
      this.setState({player:player2});
      }
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
          <Select defaultValue={optionsGameType[0]} value={optionsGameType.find(i=>i.value==this.state.game.GameTypeId)} options={optionsGameType} onChange={(e)=>{this.setState({game:{GameTypeId:e.value}});}}/>
          <label>Цвет шашек</label>
          <Select defaultValue={optionsCheckType[0]} value={optionsCheckType.find(i=>i.value==this.state.game.GameTypeId)} options={optionsCheckType} onChange={(e)=>{this.setState({player:{CheckTypeId:e.value}});}}/>
          <button onClick={this.SendNewGame}>Create</button>
        </div>
      )
    this.setState({modal:message});
    }

    async SendNewGame(){
        var game = this.state.game;
        this.setState({player:{UserId:this.state.user.Id}});
        game.CountPlayers=1;
        game.HostId=this.state.user.Id;
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
        .then(result => {
          const  response =  fetch("/api/player/GetPlayerUser/"+this.state.user.Id);
          const  player =  response.json();
          this.setState({player:player});
          this.setState({game:result})})
        .catch(function(res){ console.log(res) })
        this.setState({player:{GameId:game.Id}});
      this.setState({modal:null});
    }

    JoinGame(i){
      var player = {};
      player.UserId = this.state.user.Id;
      player.CheckTypeId = (i.CheckTypeId==1)?2:1;
      player.GameId=i.Id;
      player.Game = i;
      if(i){
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
      .then(result => this.setState({player:result}));
    }
    }

    render() {
      var player = this.state.player;
      if(player && player.Game)
        return <Game key={player.GameId} game={player.Game} player={player}></Game>
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
                   <GamesList joinGame={this.JoinGame}></GamesList>
                   <button onClick={this.CreateGame}>Create game</button>
                </content>  
              }          
          </div>
        )
    }
}

export default App;
