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
          player:{},
          modal:null,
          newGame:{GameTypeId:0}
      }
      this.ChangeUser = this.ChangeUser.bind(this);
      this.ShowModal = this.ShowModal.bind(this);
      this.CloseModal = this.CloseModal.bind(this);
      this.CreateGame = this.CreateGame.bind(this);
    }

    ChangeUser(user){
      this.setState({user:user});
    }

    ShowModal(message){
      this.setState({modal:message});
    }

    CloseModal(){
      this.setState({modal:null});
    }

    CreateGame(){
     var game = this.state.newGame;
     var options = [
      { value: 1, label: 'Русские шашки' },
      { value: 2, label: 'Поддавки' }
    ]
     var message = (
        <div className="create-game">
          <Select value={options[this.state.newGame.GameTypeId-1]} options={options} onChange={(e)=>{this.setState({newGame:{GameTypeId:e.value}}); console.log(e)}}/>
        </div>
      )
    this.setState({modal:message});
    }
    render() {
        return (
          <div className="app">
            {console.log(this.state.newGame)}
            {this.state.modal &&
            <Modal key={Math.random()*0.01} message={this.state.modal}></Modal>
            }
            {!this.state.user.Id && 
            <LoginForm ChangeUser={this.ChangeUser}></LoginForm>
            } 
            {this.state.user.Id && (
             <content>
             <GamesList></GamesList>
             <button onClick={this.CreateGame}>Create game</button>
             </content>
            )}           
          </div>
        )
    }
}

export default App;
