import React from 'react';
import logo from './logo.svg';
import './Board.css';
import Field from './Field';
class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board:props.board,
            fieldTake:null,
            checkDelete:[]
        }
      this.FiledClick = this.FiledClick.bind(this);
      this.FiledLook = this.FiledLook.bind(this);
    }
    
    FiledClick(e,item){
        var field = e.props.field;
        var checkDelete = this.state.checkDelete;
        var fields = this.state.board.Fields;
        if(field.FieldTypeId!==3){
        fields.filter(i=>i.FieldTypeId==3).forEach(element => {
            element.FieldTypeId=2;
        });         
         }


        if(field.Check){
            this.setState({fieldTake:field});
            this.FiledLook(field,field);
        }else{
            if(field.FieldTypeId==3){
                console.log(checkDelete);
                checkDelete.forEach(element => {
                    console.log(element);
                    if(element!=field )
                    if(element.Check)
                    element.Check=null;
                    else
                    return
                });
                var temp = fields.find(i=>i==field);
                temp.Check =this.state.fieldTake.Check;
            }
            this.setState({fieldTake:null});
            checkDelete=[];
            fields.filter(i=>i.FieldTypeId==3).forEach(element => {
                element.FieldTypeId=2;
            });         
        }
    }

    FiledLook(field,take){
        var fields = this.state.board.Fields;
        var checkDelete = this.state.checkDelete;
        var fieldLU = fields.find(i=>i.PozX==field.PozX-1 && i.PozY==field.PozY-1);
        var fieldLD = fields.find(i=>i.PozX==field.PozX-1 && i.PozY==field.PozY+1);
        var fieldRU = fields.find(i=>i.PozX==field.PozX+1 && i.PozY==field.PozY-1);
        var fieldRD = fields.find(i=>i.PozX==field.PozX+1 && i.PozY==field.PozY+1);
        if(fieldLU){
            if(fieldLU.Check && fieldLU.Check.CheckTypeId!=take.Check.CheckTypeId){   
                let fieldL = fields.find(i=>i.PozX==fieldLU.PozX-1 && i.PozY==fieldLU.PozY-1); 
                if(fieldL && !fieldL.Check && fieldL.PozX+2==take.PozX && fieldL.PozY+2==take.PozY)
                this.DiagLeftUp(fieldL.PozX,fieldL.PozY,take);
                let fieldR = fields.find(i=>i.PozX==fieldLU.PozX+1 && i.PozY==fieldLU.PozY-1); 
                if(fieldR && !fieldR.Check && fieldR.PozX+2==take.PozX && fieldR.PozY+2==take.PozY)
                this.DiagRightUp(fieldR.PozX,fieldR.PozY,take);
                checkDelete.push(fieldLU);
            }else if(!fieldLU.Check && (!fieldLD || (fieldLD && (!fieldLD.Check || fieldLD.Check.CheckTypeId==take.Check.CheckTypeId)))){
                    if(!fieldLU.Check && (!fieldRU || (fieldRU && (!fieldRU.Check || fieldRU.Check.CheckTypeId==take.Check.CheckTypeId))))
                     if(!fieldLU.Check && (!fieldRD || (fieldRD && (!fieldRD.Check || fieldRD.Check.CheckTypeId==take.Check.CheckTypeId))))
                         fieldLU.FieldTypeId=3;
            }
        }

        if(fieldLD){
            if(fieldLD.Check && fieldLD.Check.CheckTypeId!=take.Check.CheckTypeId){
                let fieldL = fields.find(i=>i.PozX==fieldLD.PozX-1 && i.PozY==fieldLD.PozY+1);
                if(fieldL && !fieldL.Check && fieldL.PozX+2==take.PozX && fieldL.PozY-2==take.PozY)
                this.DiagLeftDown(fieldL.PozX,fieldL.PozY,take);
                let fieldR = fields.find(i=>i.PozX==fieldLD.PozX+1 && i.PozY==fieldLD.PozY+1); 
                if(fieldR && !fieldR.Check && fieldR.PozX+2==take.PozX && fieldR.PozY-2==take.PozY)
                this.DiagRightDown(fieldR.PozX,fieldR.PozY,take);
                checkDelete.push(fieldLD);
            }else if(!fieldLD.Check && (!fieldLU || (fieldLU && (!fieldLU.Check || fieldLU.Check.CheckTypeId==take.Check.CheckTypeId)))){
                if(!fieldLD.Check && (!fieldRU || (fieldRU && (!fieldRU.Check || fieldRU.Check.CheckTypeId==take.Check.CheckTypeId))))
                 if(!fieldLD.Check && (!fieldRD || (fieldRD && (!fieldRD.Check || fieldRD.Check.CheckTypeId==take.Check.CheckTypeId))))
                 fieldLD.FieldTypeId=3;
        }
        }

        if(fieldRU){
            if(fieldRU.Check && fieldRU.Check.CheckTypeId!=take.Check.CheckTypeId){
                let fieldL = fields.find(i=>i.PozX==fieldRU.PozX-1 && i.PozY==fieldRU.PozY-1); 
                if(fieldL && !fieldL.Check && fieldL.PozX-2==take.PozX && fieldL.PozY+2==take.PozY)
                this.DiagLeftUp(fieldL.PozX,fieldL.PozY,take);
                let fieldR = fields.find(i=>i.PozX==fieldRU.PozX+1 && i.PozY==fieldRU.PozY-1); 
                if(fieldR && !fieldR.Check && fieldR.PozX-2==take.PozX && fieldR.PozY+2==take.PozY)
                this.DiagRightUp(fieldR.PozX,fieldR.PozY,take);
                checkDelete.push(fieldRU);
            }else if(!fieldRU.Check && (!fieldLD || (fieldLD && (!fieldLD.Check || fieldLD.Check.CheckTypeId==take.Check.CheckTypeId)))){
                if(!fieldRU.Check && (!fieldLU || (fieldLU && (!fieldLU.Check || fieldLU.Check.CheckTypeId==take.Check.CheckTypeId))))
                 if(!fieldRU.Check && (!fieldRD || (fieldRD && (!fieldRD.Check || fieldRD.Check.CheckTypeId==take.Check.CheckTypeId))))
                 fieldRU.FieldTypeId=3;
        }
        }

        if(fieldRD){
            if(fieldRD.Check && fieldRD.Check.CheckTypeId!=take.Check.CheckTypeId){
                let fieldL = fields.find(i=>i.PozX==fieldRD.PozX-1 && i.PozY==fieldRD.PozY+1);
                if(fieldL && !fieldL.Check && fieldL.PozX-2==take.PozX && fieldL.PozY-2==take.PozY)
                this.DiagLeftDown(fieldL.PozX,fieldL.PozY,take);
                let fieldR = fields.find(i=>i.PozX==fieldRD.PozX+1 && i.PozY==fieldRD.PozY+1); 
                if(fieldR && !fieldR.Check && fieldR.PozX-2==take.PozX && fieldR.PozY-2==take.PozY)
                this.DiagRightDown(fieldR.PozX,fieldR.PozY,take);
                checkDelete.push(fieldRD);
            }else if(!fieldRD.Check && (!fieldLD || (fieldLD && (!fieldLD.Check || fieldLD.Check.CheckTypeId==take.Check.CheckTypeId)))){
                if(!fieldRD.Check && (!fieldRU || (fieldRU && (!fieldRU.Check || fieldRU.Check.CheckTypeId==take.Check.CheckTypeId))))
                 if(!fieldRD.Check && (!fieldLU || (fieldLU && (!fieldLU.Check || fieldLU.Check.CheckTypeId==take.Check.CheckTypeId))))
                 fieldRD.FieldTypeId=3;
        }
        }
    }

    SearchEmptyField(diag,take){
        var checkDelete = this.state.checkDelete;
        for(let i=0;i<diag.length;i+=2){
            if(diag[i].Check || (diag.length>i+1 && !diag[i+1].Check))
                return;
            if(checkDelete.length<1 && !checkDelete.some(i=>i.PozX==diag[i].PozX))
            checkDelete.push(diag[i]);           
            if(diag[i].FieldTypeId!=3){
            diag[i].FieldTypeId=3;
            this.DiagLeftUp(diag[i].PozX,diag[i].PozY,take);
            this.DiagLeftDown(diag[i].PozX,diag[i].PozY,take);
            this.DiagRightUp(diag[i].PozX,diag[i].PozY,take);
            this.DiagRightDown(diag[i].PozX,diag[i].PozY,take);
            }
            
        }
    }
    
    DiagLeftUp(x,y,take){
        var diag = [];
        var fields = this.state.board.Fields;
        while(x!=-1 && y!=-1){
            diag.push(fields.find(i=>i.PozX==x && i.PozY==y));
            x--;
            y--;
        }
        this.SearchEmptyField(diag,take);
    }

    DiagLeftDown(x,y,take){
        var diag = [];
        var fields = this.state.board.Fields;
        while(x!=-1 && y!=8){
            diag.push(fields.find(i=>i.PozX==x && i.PozY==y));
            x--;
            y++;
        }
        this.SearchEmptyField(diag,take);
    }

    DiagRightUp(x,y,take){
        var diag = [];
        var fields = this.state.board.Fields;
        while(x!=8 && y!=-1){
            diag.push(fields.find(i=>i.PozX==x && i.PozY==y));
            x++;
            y--;
        }
        this.SearchEmptyField(diag,take);
    }

    DiagRightDown(x,y,take){
        var diag = []; 
        var fields = this.state.board.Fields;
        while(x!=8 && y!=8){
            diag.push(fields.find(i=>i.PozX==x && i.PozY==y));
            x++;
            y++;
        }
        this.SearchEmptyField(diag,take);
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