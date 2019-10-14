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

    componentDidMount() {
        fetch('/api/game/getgame/1')
            .then(request => request.json())
            .then(result => this.setState({game:result}));
    }

    render() {
        console.log()
        return (
          <div className="game">
              {this.state.game.Board &&
                 <Board board={this.state.game.Board}></Board>
              }
          </div>
        )
    }
}

export default Game;