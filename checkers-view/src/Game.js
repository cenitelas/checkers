import React from 'react';
import logo from './logo.svg';
import './Game.css';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            game:props.game,
            players:[]
        }
    }

    componentDidMount(){
        fetch("/api/player/GetPlayersGame/"+this.state.game.Id)
        .then(request => request.json())
        .then(result => this.setState({players:result}))
        .catch(function(res){ console.log(res) });

        fetch("/api/board/getboard/"+this.state.game.BoardId)
        .then(request => request.json())
        .then(result => this.setState({game:{Board:result}}))
        .catch(function(res){ console.log(res) });
    }
    render() {
        console.log(this.state.game);
        return (
          <div className="game">
              {this.state.game.Board &&
                 <Board key={this.state.game.Board.Id} board={this.state.game.Board}></Board>
              }
          </div>
        )
    }
}

export default Game;