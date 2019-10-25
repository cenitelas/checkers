import React from 'react';
import logo from './logo.svg';
import './Game.css';
import Board from './Board';
import WaitBlock from './WaitBlock';
import Time from './Time';
import Chat from './Chat';

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            player:props.player,
            game:props.game,
            players:[],
            move:{},
            user:props.user,
            isMove:false
        }
        this.MoveRefresh = this.MoveRefresh.bind(this);
        this.SetIsMove = this.SetIsMove.bind(this);
    }

    componentDidMount(){
        var game = this.state.game;
        var player = this.state.player;

        fetch("/api/player/GetPlayersGame/"+player.GameId)
        .then(request => request.json())
        .then(result => this.setState({players:result}))
        .catch(function(res){ console.log(res) });

        fetch("/api/board/getboard/"+player.Game.BoardId)
        .then(request => request.json())
        .then(result => {game.Board=result; this.setState({game:game})})
        .catch(function(res){ console.log(res) });

        this.intervalP = setInterval(async () =>{
            if(game.CountPlayers===2){
            var res = await fetch('/api/move/getmove/'+player.GameId);
            var rej = await res.json()
            this.MoveRefresh(rej); 
            }
            var res = await fetch('/api/game/getgame/'+player.GameId);
            var rej = await res.json()
            this.GameRefresh(rej); 
        }, 100);
    }

    async MoveRefresh(result){
        var move = this.state.move;
        var game = this.state.game;
    if(JSON.stringify(move)!=JSON.stringify(result) ){
     this.setState({move:result});
     var res = await fetch('/api/board/getboard/'+game.BoardId);
     var rej = await res.json();
     this.BoardRefresh(rej);
     move = this.state.move;
    var player = this.state.player;
       if(player.Id==move.PlayerId)
           this.setState({isMove:true});
       else 
           this.setState({isMove:false});
    }
    }

    BoardRefresh(result){
        var game = this.state.game;
        if(JSON.stringify(game.Board)!=JSON.stringify(result)){
            game.Board=result;
            this.setState({game:game});
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

    }

    SetIsMove(move){
        this.setState({isMove:move});
    }

    render() {
        var players = this.state.players;
        var player = this.state.player;
        var move = this.state.move;
        return (
          <div className="game">
              <span><Time key={move.MoveTime} time={move}></Time></span>
              {this.state.game.CountPlayers!=2 &&
                 <WaitBlock key={player.Id} message={"Ожидание соперника"}></WaitBlock>            
              }
              {!this.state.isMove &&
                 <WaitBlock key={move.MoveTime} message={<div><h5>Ожидание противника</h5><h1><Time time={move}></Time></h1></div>}></WaitBlock>            
              }
            {this.state.game.isFinish &&
                 <WaitBlock key={this.state.move.MoveTime} message={"Игра окончена!"}></WaitBlock>            
              }
              <div>{(player.CheckTypeId==1)?"Ваши белые":"Ваши черные"}</div>
              <Chat key={player.GameId} id={player.GameId} user={this.state.user}></Chat>
              {this.state.game.Board && this.state.game.Board.Fields &&
                 <Board key={Math.random()*0.001} board={this.state.game.Board} setIsMove={this.SetIsMove} player={this.state.player} isMove={this.state.isMove} move={this.state.move}></Board>
              }              
          </div>
        )
    }
}

export default Game;