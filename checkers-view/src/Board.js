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
        this.FieldsLight = this.FieldsLight.bind(this);
        this.FiledLook = this.FiledLook.bind(this);
        this.FieldsWithCheck = this.FieldsWithCheck.bind(this);
    }
    
    FiledClick(e,item){
        var fields = this.state.board.Fields;
        fields.filter(i=>i.FieldTypeId==3).forEach(element => {
            element.FieldTypeId=2;
        });         

        var field = e.props.field;
        this.setState({fieldTake:field});
        if(field.Check){
            this.FiledLook(field,field);
        }
    }

    FieldsLight(field,fieldTake){
                field.FieldTypeId = 3;        
    }
    
    FiledLook(field,fieldTake){
        var fields = this.state.board.Fields;
        if(field.PozY+1===fieldTake.PozY && field.PozX-1==fieldTake.PozX){
            var fieldR = fields.find(i=>i.PozX===field.PozX+1 && i.PozY===field.PozY-1);
        }else if(field.PozY+1===fieldTake.PozY && field.PozX+1==fieldTake.PozX){
            var fieldL = fields.find(i=>i.PozX===field.PozX-1 && i.PozY===field.PozY-1);
        }else{
            var fieldR = fields.find(i=>i.PozX===field.PozX+1 && i.PozY===field.PozY-1);
            var fieldL = fields.find(i=>i.PozX===field.PozX-1 && i.PozY===field.PozY-1);
        }

        if(fieldR){
            if(fieldR.Check && fieldR.Check.CheckTypeId!=fieldTake.Check.CheckTypeId){
                this.FieldsWithCheck(fieldR,fieldTake);
            }else if(!fieldL || !fieldL.Check || (fieldL.Check.CheckTypeId!=fieldTake.Check.CheckTypeId && field!=fieldTake)){
                this.FieldsLight(fieldR,fieldTake);
                this.FieldsWithNotCheck(fieldR,fieldTake);
            }
        }
        if(fieldL){
            if(fieldL.Check){
                this.FieldsWithCheck(fieldL,fieldTake);
            }else if(!fieldR || !fieldR.Check || (fieldR.Check.CheckTypeId!=fieldTake.Check.CheckTypeId && field!=fieldTake)){
                this.FieldsLight(fieldL,fieldTake);
                this.FieldsWithNotCheck(fieldL,fieldTake);
            }
        }
    }

    FiledLookDown(field,fieldTake){
        var fields = this.state.board.Fields;
        if(field.PozY-1===fieldTake.PozY && field.PozX-1==fieldTake.PozX){
            var fieldR = fields.find(i=>i.PozX===field.PozX+1 && i.PozY===field.PozY+1);
        }else if(field.PozY-1===fieldTake.PozY && field.PozX+1==fieldTake.PozX){
            var fieldL = fields.find(i=>i.PozX===field.PozX-1 && i.PozY===field.PozY+1);
        }else{
            var fieldR = fields.find(i=>i.PozX===field.PozX+1 && i.PozY===field.PozY+1);
            var fieldL = fields.find(i=>i.PozX===field.PozX-1 && i.PozY===field.PozY+1);
        }
      

        if(fieldR){
            if(fieldR.Check && fieldR.Check.CheckTypeId!=fieldTake.Check.CheckTypeId){
             //   this.FieldsWithCheckDown(fieldR,fieldTake);
            }else if(fieldL || !fieldL.Check || (fieldL.Check.CheckTypeId!=fieldTake.Check.CheckTypeId && field!=fieldTake)){
                this.FieldsLight(fieldR,fieldTake);
              //  this.FieldsWithNotCheck(fieldR,fieldTake);
                
            }
        }
        if(fieldL){
            if(fieldL.Check){
              //  this.FieldsWithCheckDown(fieldL,fieldTake);
            }else if(!fieldR || !fieldR.Check || (fieldR.Check.CheckTypeId!=fieldTake.Check.CheckTypeId && field!=fieldTake)){
                this.FieldsLight(fieldL,fieldTake);
              //  this.FieldsWithNotCheck(fieldL,fieldTake);
            }
        }
    }

    FieldsWithCheckDown(field,fieldTake){
        if(fieldTake.Check.CheckTypeId!==field.Check.CheckTypeId){
            this.FiledLookDown(field,fieldTake);
        }
    }

    FieldsWithCheck(field,fieldTake){
        if(fieldTake.Check.CheckTypeId!==field.Check.CheckTypeId){
            this.FiledLook(field,fieldTake);
        }
    }

    FieldsWithNotCheck(field,fieldTake){
        var fields = this.state.board.Fields;
        var fieldL = fields.find(i=>i.PozX===field.PozX-1 && i.PozY===field.PozY-1);
        var fieldR = fields.find(i=>i.PozX===field.PozX+1 && i.PozY===field.PozY-1);
        var fieldLd = fields.find(i=>i.PozX===field.PozX-1 && i.PozY===field.PozY+1);
        var fieldRd = fields.find(i=>i.PozX===field.PozX+1 && i.PozY===field.PozY+1);
        if(fieldR && fieldR.Check){
        this.FieldsWithCheck(fieldR,fieldTake);
        }
        if(fieldL && fieldL.Check){
        this.FieldsWithCheck(fieldL,fieldTake);
        }
        if(fieldRd && fieldRd.Check){
            this.FiledLookDown(fieldRd,fieldTake);
        }
        if(fieldLd && fieldLd.Check){
            this.FiledLookDown(fieldLd,fieldTake);
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