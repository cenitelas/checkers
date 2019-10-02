import React from 'react';
import logo from './logo.svg';
import './Field.css';

class Field extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            check:props.check,
            class:props.class,
            fieldType:props.fieldType,
            click:props.click,
            pozX:props.pozX,
            pozY:props.pozY
        }
        this.FieldLight = this.FieldLight.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({class: nextProps.class});
    }

    FieldLight(){
        alert("asd");
        // if(!this.state.class)
        // this.setState({class:"field_click"});
        // else
        // this.setState({class:""});
    }

    render() {
        var check = this.state.check;
        var fieldType = (this.state.fieldType==1)?"field_white ":"field_black ";
        fieldType+=this.state.class;
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

export default Field;