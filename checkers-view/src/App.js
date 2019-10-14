import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './LoginForm';
import Game from './Game';
import GamesList from './GamesList';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          user:{},
          player:{}
      }
      this.ChangeUser = this.ChangeUser.bind(this);
    }

    ChangeUser(user){
      this.setState({user:user});
    }
    render() {
        return (
          <div className="app">
            {!this.state.user.Id && 
            <LoginForm ChangeUser={this.ChangeUser}></LoginForm>
            } 
            {this.state.user.Id &&
            <GamesList></GamesList>
            }           
          </div>
        )
    }
}

export default App;
