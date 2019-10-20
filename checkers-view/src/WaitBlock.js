import React from 'react';
import logo from './logo.svg';
import './Game.css';
import Board from './Board';

class WaitBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message:props.message
        }
    }

    render() {

        return (
            <div className="wait-block">
            <div className="wait-message">{this.state.message}</div>
             </div>
        )
    }
}

export default WaitBlock;