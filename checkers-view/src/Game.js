import React from 'react';
import logo from './logo.svg';
import './Game.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roomsInfo:[{}],
            setPage:props.setPage
        }
    }

    componentDidMount() {
        fetch('/api/users/')
            .then(request => request.json())
            .then(result => this.setState({ roomsInfo: result }));
    }

    render() {
        const roomsInfo = this.state.roomsInfo;
        return (
          <div>
            <p>Name = {roomsInfo[0].Name}</p>
            <p>Password = {roomsInfo[0].Password}</p>
            <p>Email = {roomsInfo[0].Email}</p>
          </div>
        )
    }
}

export default App;