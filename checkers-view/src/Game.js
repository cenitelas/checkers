import React from 'react';
import logo from './logo.svg';
import './Game.css';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            game:props.game,
            players:props.players,
            user:props.user
        }
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