import React from 'react';
import './GamesList.css';

class GamesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            games:[],
            users:[]
        }
        this.UsersRefresh = this.UsersRefresh.bind(this);
        this.GameRefresh = this.GameRefresh.bind(this);
    }
    componentDidMount(){
    this.intervalU = setInterval(() =>{
        fetch('/api/users/getusers')
        .then(request => request.json())
        .then(result=>this.UsersRefresh(result));   
      }, 1000);
    
    this.intervalG = setInterval(() =>{
        fetch('/api/game/getgames')
        .then(request => request.json())
        .then(result=>this.GameRefresh(result)); 
      }, 1000);
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

    render() {
        var games = this.state.games;
        var users = this.state.users;
        console.log(games);
        return (
          <div className="game-list">
              {games.map(i=>
               <div key={i.Id} className="line">{users.find(z=>z.Id==i.HostId).Name}</div>
              )}
          </div>
        )
    }
}

export default GamesList;