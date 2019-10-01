import React from 'react';
import logo from './logo.svg';
import './Check.css';

class Check extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            check:props.check,
            fieldType:props.fieldType,
            click:props.click,
            class:""
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        if(!this.state.class)
        this.setState({class:"check_click"});
        else
        this.setState({class:""});
    }

    render() {
        var check = this.state.check;
        var fieldType = (this.state.fieldType==1)?"field field_white":"field field_black";
        var checkType = "";
        if(check)
        checkType = (check.CheckTypeId==1)?"check check_white ":"check check_black ";
        return (
          <div className={fieldType} onClick={()=>this.state.click(this,this.state.check)}>
              {check &&
                <div className={checkType+this.state.class}></div>
              }
          </div>
        )
    }
}

export default Check;