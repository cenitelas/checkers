import React from 'react';
import logo from './logo.svg';
import './Game.css';
import Board from './Board';
import WaitBlock from './WaitBlock';

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            player:props.player,
            game:props.game,
            players:[],
            move:{}, 
            message:"",
            isMove:false
        }
        this.MoveRefresh = this.MoveRefresh.bind(this);
    }

    componentDidMount(){
        var game = this.state.game;
        var move = this.state.move;

        fetch("/api/player/GetPlayersGame/"+game.Id)
        .then(request => request.json())
        .then(result => this.setState({players:result}))
        .catch(function(res){ console.log(res) });

        fetch("/api/board/getboard/"+game.BoardId)
        .then(request => request.json())
        .then(result => game.Board=result)
        .catch(function(res){ console.log(res) });


    this.intervalP = setInterval(() =>{
        this.MoveRefresh(game)
    }, 1000);
    }

    MoveRefresh(game){
        fetch('/api/move/getmove/'+game.Id)
        .then(request => request.json())
        .then(result=>this.setState({move:result})); 
    var move = this.state.move;
    var player = this.state.player;

       if(player.Id==move.playerId)
           this.setState({isMove:true});
       else 
           this.setState({isMove:false});
    }


    componentWillUnmount() {
        clearInterval(this.intervalP);
    }
    render() {
        var players = this.state.players;
        var player = this.state.player;
        var message = this.state.player;
        var move = this.state.move;
        return (
          <div className="game">
              {this.state.isMove==false &&
                 <WaitBlock key={player.Id} message={"asd"}></WaitBlock>            
              }
              <div>{(player.CheckTypeId==1)?"Ваши белые":"Ваши черные"}{move.playerId}</div>
              {this.state.game.Board && this.state.game.Board.Fields &&
                 <Board key={this.state.game.Board.Id} board={this.state.game.Board} move={this.state.isMove} player={this.state.player}></Board>
              }
            
              
          </div>
        )
    }
}

export default Game;