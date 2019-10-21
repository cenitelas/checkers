import React from 'react';
import './GamesList.css';
import { async } from 'q';

class GamesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            games:[],
            users:[],
            joinGame:props.joinGame
        }
        this.UsersRefresh = this.UsersRefresh.bind(this);
        this.GameRefresh = this.GameRefresh.bind(this);
        this.ViewHost = this.ViewHost.bind(this);
    }
    componentDidMount(){
    this.intervalU = setInterval(async () =>{
       var res = await fetch('/api/users/getusers');
       var rej = await res.json();
       this.UsersRefresh(rej);   
      }, 100);
    
    this.intervalG = setInterval(async () =>{
        var res = await fetch('/api/game/getgames');
        var rej = await res.json();
        this.GameRefresh(rej); 
      }, 100);
    }

    GameRefresh(games){
        if(JSON.stringify(this.state.games) !== JSON.stringify(games)){           
            this.setState({games:games});
        }
    }

    UsersRefresh(users){
        if(JSON.stringify(this.state.users) !== JSON.stringify(users)){
            this.setState({users:users});
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalG);
        clearInterval(this.intervalU);
    }

   async ViewHost(i){
    const  result = await  fetch("/api/player/GetPlayerUser/"+i.HostId);
    const  player = await result.json();

    return player.CheckTypeId;
   }
    render() {
        var games = this.state.games;
        var users = this.state.users;
        return (
          <div className="game-list">
              {games.map(i=>
               <div key={i.Id} className="line" onDoubleClick={()=>this.state.joinGame(i)}>{users.find(z=>z.Id==i.HostId).Name+" | "+((i.GameTypeId==1)?"Русские шашки":"Поддавки")+" | "+((this.ViewHost(i)==1)?"Белые":"Черные")}</div>
              )}
          </div>
        )
    }
}

export default GamesList;