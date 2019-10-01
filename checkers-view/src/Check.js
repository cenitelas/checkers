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
        var check = this.state.check;
        var type = (check.CheckTypeId==2)?"field field_white":"field field_black";
        return (
          <div className={type}>
          </div>
        )
    }
}

export default Check;