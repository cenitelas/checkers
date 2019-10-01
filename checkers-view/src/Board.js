import React from 'react';
import logo from './logo.svg';
import './Board.css';
import Check from './Check';
class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board:props.board
        }
    }

    render() {
        var checkers = this.state.board.Checkers;
        return (
          <div className="board">
              {checkers.map((item, i) => <Check check={item} key={i}></Check>)}
          </div>
        )
    }
}

export default Board;