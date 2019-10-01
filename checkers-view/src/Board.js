import React from 'react';
import logo from './logo.svg';
import './Board.css';
import Check from './Check';
class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board:props.board,
            checkTake:{}
        }
        this.CheckClick = this.CheckClick.bind(this);
    }

    FillBoard() {
        var field = [];         
        var color = 2; 
            var checkers = this.state.board.Checkers;
            for(let i=0;i<8;i++){
                color =(i%2==0)?2:1;
                for(let j=0;j<8;j++){
                   color=(color===2)?1:2;
                    var check = {};
                    check = checkers.find(item => item.PozX == j && item.PozY==i);
                    if(check)
                    check['class']="null";
                    field.push(<Check fieldType={color} check={check} key={i+''+j} click={this.CheckClick}></Check>)
                }
            }
        return field;
    }

    CheckClick(e,item){
        if(this.state.checkTake['onClick'])
            this.state.checkTake.onClick();
            this.setState({checkTake:e})
            e.onClick();
    }

    render() 
    {
        return (
          <div className="board">
              {this.FillBoard().map((item, i) => item)}
          </div>
        )
    }
}

export default Board;