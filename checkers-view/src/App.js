import React,{ Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './LoginForm';
import Game from './Game';
import GamesList from './GamesList';
import Modal from './Modal';
import Select from 'react-select';
import './Modal.css';
import Chat from './Chat';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          user:{},
          player:{CheckTypeId:1},
          modal:null,
          game:{GameTypeId:1, CheckTypeId:1},
          isCreateGame:false
      }
      this.ChangeUser = this.ChangeUser.bind(this);
      this.ShowCreateGame = this.ShowCreateGame.bind(this);
      this.CloseCreateGame = this.CloseCreateGame.bind(this);
      this.CreateGame = this.CreateGame.bind(this);
      this.SendNewGame = this.SendNewGame.bind(this);
      this.JoinGame = this.JoinGame.bind(this);
    }

    async ChangeUser(user){
      var  response =  await fetch("/api/player/GetPlayerUser/"+user.Id);
      var  player =  await response.json();
      this.setState({user:user});;
      if(player){
      var response2 =  await fetch("/api/player/getplayer/"+player.Id);
      var player2 =  await response2.json();  
      this.setState({player:player2});
      }
    }

    ShowCreateGame(){
      this.setState({isCreateGame:true});
    }

    CloseCreateGame(){
      this.setState({isCreateGame:false});
    }

    CreateGame(){
     var optionsGameType = [
      { value: 1, label: 'Русские шашки' }
    ]
    var optionsCheckType = [
      { value: 1, label: 'Белые' },
      { value: 2, label: 'Черные' }
    ]
    var game = this.state.game;
    return(
        <div className="create-game">
          <label>Тип игры</label>
          <Select defaultValue={optionsGameType.find(i=>i.value==game.GameTypeId)} value={optionsGameType.find(i=>i.value==game.GameTypeId)} options={optionsGameType} onChange={(e)=>{game.GameTypeId=e.value; this.setState({game:game})}}/>
          <label>Цвет шашек</label>
          <Select defaultValue={optionsCheckType.find(i=>i.value==game.CheckTypeId)} value={optionsCheckType.find(i=>i.value==game.CheckTypeId)} options={optionsCheckType} onChange={(e)=>{game.CheckTypeId=e.value; this.setState({game:game})}}/>
          <button onClick={this.SendNewGame}>Create</button>
        </div>
    )
    }

    async SendNewGame(){
        var game = this.state.game;
        var player = this.state.player;
        game.CountPlayers=1;
        game.HostId=this.state.user.Id;
        game.isFinish=false;
        var gameRes = await fetch("/api/game/postgame",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(game)
        });
        game = await gameRes.json();
        const  response = await fetch("/api/player/GetPlayerUser/"+this.state.user.Id);
        player = await response.json();
        player.GameId=game.Id;
        player.Game=game;
        this.setState({player:player});
        this.setState({game:game});
      this.setState({isCreateGame:false});
    }

    async JoinGame(i){
      var player = {};
      player.UserId = this.state.user.Id;
      player.GameId=i.Id;
      player.Game = i;
      if(i){
      var res = await fetch("/api/player/postplayer",
      {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(player)
      });
      var newPlayer = await res.json();
      player.CheckTypeId = newPlayer.CheckTypeId;
      player.Id=newPlayer.Id;
      this.setState({player:player});
    }
    }

    render() {
      var player = this.state.player;
      var user = this.state.user;
      if(player && player.Game)
        return <Game key={player.GameId} game={player.Game} player={player} user={user}></Game>
      else
        return (
          <div className="app">
            {this.state.isCreateGame && 
              <div className="modal">
              <div className="modal-border">
                  {this.CreateGame()}
              </div>
          </div>
            }
            {!this.state.user.Id &&
              <LoginForm ChangeUser={this.ChangeUser}></LoginForm>
            }
            {this.state.user.Id &&
                <content>
                  <div className="header">
                    <h2>Ваше имя: {user.Name}</h2>
                    <h2>Количество побед: {user.Victory}</h2>
                    <h2 className="create-game" onClick={this.ShowCreateGame}>Создать игру</h2>
                  </div>
                   <Chat key="1" id={0} user={this.state.user}></Chat>
                   <GamesList key="2" joinGame={this.JoinGame}></GamesList>
                </content>  
              }          
          </div>
        )
    }
}

export default App;
