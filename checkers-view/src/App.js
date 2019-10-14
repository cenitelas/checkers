import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './LoginForm';
import Game from './Game';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          user:{},
          games:[],
          players:[]
      }
      this.FillListGames = this.FillListGames.bind(this);
      this.ChangeUser = this.ChangeUser.bind(this);
    }

    componentDidMount() {
      var tepm = this;
      setInterval(function(){
      fetch('/api/game/getgames')
      .then(request => request.json())
      .then(result => tepm.setState({games:result}));
      fetch('/api/player/getplayers')
      .then(request => request.json())
      .then(result => tepm.setState({players:result}));
    }, 1000);
    }

    ChangeUser(user){
      this.setState({user:user});
    }

    FillListGames(){
     var games = this.state.games;
     games.forEach(element => {
     fetch('/api/users/UserGet/'+element.HostId)
     .then(request => request.json())
     .then(result => element.User=result);
     });
     games=games.filter(i=>i.isFinish==false);
     var players = this.state.players;
     var player = null;
     games.forEach(element => {
       player = players.find(i=>i.GameId==element.Id && i.UserId==this.state.user.Id);
     });
     if(player){
      var game = null;
      games.forEach(element => {
        players = players.find(i=>i.GameId==element.Id);
      });  
      game = games.find(i=>i.GameId==player.GameId);
      return (
       <Game players={players} user={this.state.user} game={game}></Game>
      )
     }
      return (
        <div className="list-game">
          {games.map(i=>
            (i.User &&
              console.log(i.User.Name)
            //<h1 key={i.Id}>{i.User.Name}</h1>
          ))}
        </div>
      )
    }

    render() {
        return (
          <div>
            {!this.state.user.Id && 
            <LoginForm ChangeUser={this.ChangeUser}></LoginForm>
            } 
            {this.state.user.Id &&
            this.FillListGames()
            }           
          </div>
        )
    }
}

export default App;
