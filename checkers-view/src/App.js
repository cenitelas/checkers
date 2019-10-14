import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './LoginForm';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          user:{},
          games:[]
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
    }, 1000);
    }

    ChangeUser(user){
      this.setState({user:user});
    }

    FillListGames(){
     var games = this.state.games;
      return (
        <div className="list-game">
          {games.map(i=>
            <h1>{i.HostId}</h1>
            )}
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
