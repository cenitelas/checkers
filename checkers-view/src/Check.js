import React from 'react';
import logo from './logo.svg';
import './Check.css';

class Check extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            check:props.check
        }

    }

    render() {
        var checkType = (this.state.check.CheckTypeId==1)?"check check_white ":"check check_black ";
        return (
          <div className={checkType}>
            
          </div>
        )
    }
}

export default Check;