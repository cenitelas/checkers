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
        var fields = this.state.board.Fields;
        if(field.FieldTypeId!==3){
        fields.filter(i=>i.FieldTypeId==3).forEach(element => {
            element.FieldTypeId=2;
        });         
         }


        if(field.Check){
            this.setState({fieldTake:field});
            this.setState({checkDelete:[]});
            this.FiledLook(field,field);
        }else{
            if(field.FieldTypeId==3){
                this.ClearFields(field,this.state.fieldTake);
            }
            this.setState({fieldTake:null});
            this.setState({checkDelete:[]});
            fields.filter(i=>i.FieldTypeId==3).forEach(element => {
                element.FieldTypeId=2;
            });         
        }
    }

    ClearFields(field,take){
        var checkDelete = this.state.checkDelete;
        checkDelete.forEach(element => {
           console.log(element);
       });

            checkDelete.forEach(element => {
            if(element!=field )
            if(element.Check)
            element.Check=null;
            else
            return
            });

        field.Check=take.Check;
        take.Check=null;
        if(field.Check.CheckTypeId==1 && field.PozY==7 ){
            field.Check.IsQuein = true;
        }

        if(field.Check.CheckTypeId==2 && field.PozY==0 ){
            field.Check.IsQuein = true;
        }
    }

    FiledLook(field,take){
        var isEnemy=false;
        var fields = this.state.board.Fields;
        var checkDelete = this.state.checkDelete;
        var fieldLU = fields.find(i=>i.PozX==field.PozX-1 && i.PozY==field.PozY-1);
        var fieldLD = fields.find(i=>i.PozX==field.PozX-1 && i.PozY==field.PozY+1);
        var fieldRU = fields.find(i=>i.PozX==field.PozX+1 && i.PozY==field.PozY-1);
        var fieldRD = fields.find(i=>i.PozX==field.PozX+1 && i.PozY==field.PozY+1);
        if(fieldLU){
            if(take.Check.IsQuein){
                this.DiagLeftUp(fieldLU.PozX,fieldLU.PozY,take);
            }
            else
            if(fieldLU.Check && fieldLU.Check.CheckTypeId!=take.Check.CheckTypeId && fieldLU.PozX!=0 && fieldLU.PozY!=0){
                isEnemy=true;   
                console.log(isEnemy+" LU")
                let fieldL = fields.find(i=>i.PozX==fieldLU.PozX-1 && i.PozY==fieldLU.PozY-1); 
                if(fieldL && !fieldL.Check && fieldL.PozX+2==take.PozX && fieldL.PozY+2==take.PozY)
                this.DiagLeftUp(fieldL.PozX,fieldL.PozY,take);
                let fieldR = fields.find(i=>i.PozX==fieldLU.PozX+1 && i.PozY==fieldLU.PozY-1); 
                if(fieldR && !fieldR.Check && fieldR.PozX+2==take.PozX && fieldR.PozY+2==take.PozY)
                this.DiagRightUp(fieldR.PozX,fieldR.PozY,take);
                if(fieldL && fieldL.Check)
                isEnemy=false;
                checkDelete.push(fieldLU);
            }
        }

        if(fieldLD){
            if(take.Check.IsQuein){
                this.DiagLeftDown(fieldLD.PozX,fieldLD.PozY,take);
            }
            else
            if(fieldLD.Check && fieldLD.Check.CheckTypeId!=take.Check.CheckTypeId && fieldLD.PozX!=0 && fieldLD.PozY!=7){
                isEnemy=true;
                console.log(isEnemy+" LD")
                let fieldL = fields.find(i=>i.PozX==fieldLD.PozX-1 && i.PozY==fieldLD.PozY+1);
                if(fieldL && !fieldL.Check && fieldL.PozX+2==take.PozX && fieldL.PozY-2==take.PozY)
                this.DiagLeftDown(fieldL.PozX,fieldL.PozY,take);
                let fieldR = fields.find(i=>i.PozX==fieldLD.PozX+1 && i.PozY==fieldLD.PozY+1); 
                if(fieldR && !fieldR.Check && fieldR.PozX-2==take.PozX && fieldR.PozY-2==take.PozY)
                this.DiagRightDown(fieldR.PozX,fieldR.PozY,take);
                if(fieldL && fieldL.Check)
                isEnemy=false;
                checkDelete.push(fieldLD);
            }
        }

        if(fieldRU){
            if(take.Check.IsQuein){
                this.DiagRightUp(fieldRU.PozX,fieldRU.PozY,take);
            }
            else if(fieldRU.Check && fieldRU.Check.CheckTypeId!=take.Check.CheckTypeId && fieldRU.PozX!=7 && fieldRU.PozY!=0){
                isEnemy=true;
                console.log(isEnemy+" RU")
                let fieldL = fields.find(i=>i.PozX==fieldRU.PozX-1 && i.PozY==fieldRU.PozY-1); 
                if(fieldL && !fieldL.Check && fieldL.PozX-2==take.PozX && fieldL.PozY+2==take.PozY)
                this.DiagLeftUp(fieldL.PozX,fieldL.PozY,take);
                let fieldR = fields.find(i=>i.PozX==fieldRU.PozX+1 && i.PozY==fieldRU.PozY-1); 
                if(fieldR && !fieldR.Check && fieldR.PozX-2==take.PozX && fieldR.PozY+2==take.PozY)
                this.DiagRightUp(fieldR.PozX,fieldR.PozY,take);
                if(fieldR && fieldR.Check)
                isEnemy=false;
                checkDelete.push(fieldRU);
            }
        }

        if(fieldRD){
            if(take.Check.IsQuein){
                this.DiagRightDown(fieldRD.PozX,fieldRD.PozY,take);
            }
            else
            if(fieldRD.Check && fieldRD.Check.CheckTypeId!=take.Check.CheckTypeId && fieldRD.PozX!=7 && fieldRD.PozY!=7){
                isEnemy=true;
                console.log(isEnemy+" RD")
                let fieldL = fields.find(i=>i.PozX==fieldRD.PozX-1 && i.PozY==fieldRD.PozY+1);
                if(fieldL && !fieldL.Check && fieldL.PozX+2==take.PozX && fieldL.PozY-2==take.PozY)
                this.DiagLeftDown(fieldL.PozX,fieldL.PozY,take);
                let fieldR = fields.find(i=>i.PozX==fieldRD.PozX+1 && i.PozY==fieldRD.PozY+1); 
                if(fieldR && !fieldR.Check && fieldR.PozX-2==take.PozX && fieldR.PozY-2==take.PozY)
                this.DiagRightDown(fieldR.PozX,fieldR.PozY,take);
                if(fieldR && fieldR.Check)
                isEnemy=false;
                checkDelete.push(fieldRD);
            }
        }

        if(!isEnemy){
            if(take.Check.CheckTypeId==1){
                if(fieldRD && !fieldRD.Check)fieldRD.FieldTypeId=3;
                if(fieldLD && !fieldLD.Check)fieldLD.FieldTypeId=3;
            }else{
                if(fieldRU && !fieldRU.Check)fieldRU.FieldTypeId=3;
                if(fieldLU && !fieldLU.Check)fieldLU.FieldTypeId=3;
            }
            if(take.Check.IsQuein){
                if(fieldRD && !fieldRD.Check)fieldRD.FieldTypeId=3;
                if(fieldLD && !fieldLD.Check)fieldLD.FieldTypeId=3;
                if(fieldRU && !fieldRU.Check)fieldRU.FieldTypeId=3;
                if(fieldLU && !fieldLU.Check)fieldLU.FieldTypeId=3;
            }
        }
    }

    SearchEmptyField(diag,take){
        if(take.Check.IsQuein){
            this.SearchEmptyFieldQuein(diag,take);
            return;
        }
        var checkDelete = this.state.checkDelete;
        for(let i=0;i<diag.length;i+=2){
            if(diag[i].Check)
                return;
            
            if((i>0 && diag[i-1].Check  && diag[i-1].Check.CheckTypeId==take.Check.CheckTypeId) && (i<diag.length-1 && diag[i+1].Check  && diag[i+1].Check.CheckTypeId==take.Check.CheckTypeId))
            return;
     
            if(!checkDelete.some(z=>z.PozX==diag[i].PozX && z.PozY==diag[i].PozY)){
                checkDelete.push(diag[i]);  
                if(i>0)
                checkDelete.push(diag[i-1]);  
            }    
            if(diag[i].FieldTypeId!=3){
            diag[i].FieldTypeId=3;
            this.DiagLeftUp(diag[i].PozX,diag[i].PozY,take);
            this.DiagLeftDown(diag[i].PozX,diag[i].PozY,take);
            this.DiagRightUp(diag[i].PozX,diag[i].PozY,take);
            this.DiagRightDown(diag[i].PozX,diag[i].PozY,take);
            }
            
        }
    }

    SearchEmptyFieldQuein(diag,take){
        var checkDelete = this.state.checkDelete;
        for(let i=0;i<diag.length;i++){
            if(diag[i].Check && diag[i].Check.CheckTypeId==take.Check.CheckTypeId)
                return;
            
            if(checkDelete.length<1 || !checkDelete.some(z=>i.PozX==diag[i].PozX && z.PozY==diag[i].PozY))
            checkDelete.push(diag[i]);           
            if(diag[i].FieldTypeId!=3 && !diag[i].Check){
            diag[i].FieldTypeId=3;
            this.DiagLeftUp(diag[i].PozX,diag[i].PozY,take);
            this.DiagLeftDown(diag[i].PozX,diag[i].PozY,take);
            this.DiagRightUp(diag[i].PozX,diag[i].PozY,take);
            this.DiagRightDown(diag[i].PozX,diag[i].PozY,take);
            }
            
        }
        checkDelete.forEach(element => {
            if(element.Check)
           console.log(element);
       });
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