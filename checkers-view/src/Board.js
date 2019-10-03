import React from 'react';
import logo from './logo.svg';
import './Board.css';
import Field from './Field';
class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board:props.board,
            fieldTake:null
        }
        this.FiledClick = this.FiledClick.bind(this);
        this.FieldsLightWithCheck = this.FieldsLightWithCheck.bind(this);
        this.FieldsLight = this.FieldsLight.bind(this);
    }
    
    FiledClick(e,item){
        var fields = this.state.board.Fields;
        fields.filter(i=>i.FieldTypeId==3).forEach(element => {
            element.FieldTypeId=2;
        });         

        var field = e.props.field;
        this.setState({fieldTake:field});
        if(field.Check){
            this.FieldsLight(field,field);
        }
    }

    FieldsLight(field){
        var fields = this.state.board.Fields;
        var fieldL = fields.find(i=>i.PozX===field.PozX-1 && i.PozY===field.PozY-1);
        var fieldR = fields.find(i=>i.PozX===field.PozX+1 && i.PozY===field.PozY-1);
            if(fieldL)
            if(fieldL.Check){
                this.FieldsLightWithCheck(fieldL,field);
            }else if(!fieldR || !fieldR.Check){
                fieldL.FieldTypeId = 3;
            }
            if(fieldR)
            if(fieldR.Check){
                this.FieldsLightWithCheck(fieldR,field);
            }else if(!fieldL || !fieldL.Check){
                fieldR.FieldTypeId = 3;
            }
        this.setState({fields:fields});
    }

    FieldsLightWithCheck(field,fieldTake){
        if(fieldTake.Check.CheckTypeId!==field.Check.CheckTypeId){
            this.FieldsLight(field);
        }
    }

    render() 
    {
        return (
          <div className="board">
              {this.state.board.Fields.map((item, i) => 
                <Field field={item} key={item.Id} click={this.FiledClick}></Field>
                )}
          </div>
        )
    }
}

export default Board;