import React from 'react';
import logo from './logo.svg';
import './Game.css';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            game:{}
        }
    }

    componentDidMount() {
        fetch('/api/game/getgame/1')
            .then(request => request.json())
            .then(result => this.setState({game:result})).then(
        fetch('/api/board/getboard/1')
            .then(request => request.json())
            .then(result => this.setState({game:{board:result}})));

    }

    render() {
        return (
          <div className="game">
            {this.state.game.board &&
                 <Board board={this.state.game.board}></Board>
            }
          </div>
        )
    }
}

export default Game;