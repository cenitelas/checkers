import React from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Game';
class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
          <div>
              <Game key="1"></Game>
          </div>
        )
    }
}

export default App;
