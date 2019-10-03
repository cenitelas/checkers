import React from 'react';
import logo from './logo.svg';
import './Field.css';
import Check from './Check'

class Field extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            field:props.field,
            click:props.click
        }
    }

    render() {
        var fieldType = (this.state.field.FieldTypeId==1)?"field field_white ":(this.state.field.FieldTypeId==2)?"field field_black ":"field field_light ";
        return (
          <div className={fieldType+this.state.light} onClick={()=>this.state.click(this,this.state.field)}>
            {this.state.field.Check &&
                <Check check={this.state.field.Check} key={this.state.field.Check.Id}></Check>
            }
          </div>
        )
    }
}

export default Field;