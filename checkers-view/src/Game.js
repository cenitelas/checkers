import React from 'react';
import logo from './logo.svg';
import './Game.css';
import Board from './Board';
import WaitBlock from './WaitBlock';
import { async } from 'q';

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            player:props.player,
            game:props.game,
            players:[],
            move:{},
            isMove:false
        }
        this.MoveRefresh = this.MoveRefresh.bind(this);
    }

    componentDidMount(){
        var game = this.state.game;

        fetch("/api/player/GetPlayersGame/"+game.Id)
        .then(request => request.json())
        .then(result => this.setState({players:result}))
        .catch(function(res){ console.log(res) });

        fetch("/api/board/getboard/"+game.BoardId)
        .then(request => request.json())
        .then(result => {game.Board=result; this.setState({game:game})})
        .catch(function(res){ console.log(res) });
        
        this.intervalP = setInterval(async () =>{
            var res = await fetch('/api/move/getmove/'+game.Id);
            var rej = await res.json()
            this.MoveRefresh(rej); 
        }, 100);

        this.intervalG = setInterval(async () =>{
            var res = await fetch('/api/game/getgame/'+game.Id);
            var rej = await res.json()
            this.GameRefresh(rej); 
        }, 100);
    }

    MoveRefresh(result){
        var move = this.state.move;
        var game = this.state.game;
    if(JSON.stringify(move)!=JSON.stringify(result)){
    this.setState({move:result});
     fetch('/api/board/getboard/'+game.BoardId)
    .then(request => request.json())
    .then(result2=>{game.Board=result2; this.setState({game:game})}); 
     move = this.state.move;
    var player = this.state.player;
       if(player.Id==move.PlayerId)
           this.setState({isMove:true});
       else 
           this.setState({isMove:false});
    }
    }

    GameRefresh(result){
        var game = this.state.game;
        if(game.isFinish!=result.isFinish){    
            this.setState({game:result});
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalP);
        clearInterval(this.intervalG);
    }

    render() {
        var players = this.state.players;
        var player = this.state.player;
        return (
          <div className="game">
              {this.state.game.CountPlayers!=2 &&
                 <WaitBlock key={player.Id} message={"Ожидание соперника"}></WaitBlock>            
              }
              {!this.state.isMove &&
                 <WaitBlock key={player.Id} message={"Ожидание соперника"}></WaitBlock>            
              }
            {this.state.game.isFinish &&
                 <WaitBlock key={this.state.move.MoveTime} message={"Игра окончена!"}></WaitBlock>            
              }
              <div>{(player.CheckTypeId==1)?"Ваши белые":"Ваши черные"}</div>
              {this.state.game.Board && this.state.game.Board.Fields &&
                 <Board key={Math.random()+0.01} board={this.state.game.Board} player={this.state.player} isMove={this.state.isMove} move={this.state.move}></Board>
              }              
          </div>
        )
    }
}

export default Game;