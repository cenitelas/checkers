import React from 'react';
import logo from './logo.svg';
import './Board.css';
import Field from './Field';
import WaitBlock from './WaitBlock';

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board:props.board,
            fieldTake:null,
            checkDelete:[],
            isEnemy:false,
            move:props.move,
            isMove:props.isMove,
            player:props.player,
            setIsMove:props.setIsMove
        }
      this.FiledClick = this.FiledClick.bind(this);
      this.FiledLook = this.FiledLook.bind(this);
    }
    
    FiledClick(e,item){
        var isMove = this.state.isMove;
        var player = this.state.player;
        if(isMove){
        this.setState({isEnemy:false});
        var field = e.props.field;    
        var fields = this.state.board.Fields;
        if(field.FieldTypeId!==3){
        fields.filter(i=>i.FieldTypeId==3).forEach(element => {
            element.FieldTypeId=2;
        });         
         }
        if(field.Check && player.CheckTypeId==field.Check.CheckTypeId){
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
    }

    ClearFields(field,take){
        var checkDelete = this.state.checkDelete;
        checkDelete = checkDelete.slice(0, checkDelete.indexOf(field));
        field.Check=take.Check;
        field.CheckId=take.CheckId;
        take.Check=null;
        checkDelete.forEach(element => {     
            if(element.Check)
            element.Check=null;
        });
        if(field.Check.CheckTypeId==1 && field.PozY==7 ){
            field.Check.IsQuein = true;
        }

        if(field.Check.CheckTypeId==2 && field.PozY==0 ){
            field.Check.IsQuein = true;
        }

        fetch("/api/board/postboard",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(this.state.board)
        });

        fetch("/api/move/PostMove",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(this.state.move)
        });
        this.state.setIsMove(false);
    }

    FiledLook(field,take){
        var fields = this.state.board.Fields;
        var fieldLU = fields.find(i=>i.PozX==field.PozX-1 && i.PozY==field.PozY-1);
        var fieldLD = fields.find(i=>i.PozX==field.PozX-1 && i.PozY==field.PozY+1);
        var fieldRU = fields.find(i=>i.PozX==field.PozX+1 && i.PozY==field.PozY-1);
        var fieldRD = fields.find(i=>i.PozX==field.PozX+1 && i.PozY==field.PozY+1);
        if(fieldLU){
            if(fieldLU.Check && fieldLU.Check.CheckTypeId!=take.Check.CheckTypeId && fieldLU.PozX!=0 && fieldLU.PozY!=0){
                 this.DiagLeftUp(fieldLU.PozX,fieldLU.PozY,take);
            }
        }

        if(fieldLD){
            if(fieldLD.Check && fieldLD.Check.CheckTypeId!=take.Check.CheckTypeId && fieldLD.PozX!=0 && fieldLD.PozY!=7){
                this.DiagLeftDown(fieldLD.PozX,fieldLD.PozY,take);
            }
        }

        if(fieldRU){
            if(fieldRU.Check && fieldRU.Check.CheckTypeId!=take.Check.CheckTypeId && fieldRU.PozX!=7 && fieldRU.PozY!=0){               
                 this.DiagRightUp(fieldRU.PozX,fieldRU.PozY,take);
            }
        }

        if(fieldRD){
            if(fieldRD.Check && fieldRD.Check.CheckTypeId!=take.Check.CheckTypeId && fieldRD.PozX!=7 && fieldRD.PozY!=7){            
                this.DiagRightDown(fieldRD.PozX,fieldRD.PozY,take);
            }
         }

        if(this.VerefyField(fieldLU,fieldLD,fieldRU,fieldRD,take)){
            if(take.Check.CheckTypeId==1){
                if(fieldRD && !fieldRD.Check)fieldRD.FieldTypeId=3;
                if(fieldLD && !fieldLD.Check)fieldLD.FieldTypeId=3;
            }else{
                if(fieldRU && !fieldRU.Check)fieldRU.FieldTypeId=3;
                if(fieldLU && !fieldLU.Check)fieldLU.FieldTypeId=3;
            }
            if(take.Check.IsQuein){
                if(fieldRD && !fieldRD.Check)this.DiagRightDown(fieldRD.PozX,fieldRD.PozY,take);
                if(fieldLD && !fieldLD.Check)this.DiagLeftDown(fieldLD.PozX,fieldLD.PozY,take);
                if(fieldRU && !fieldRU.Check)this.DiagRightUp(fieldRU.PozX,fieldRU.PozY,take);
                if(fieldLU && !fieldLU.Check)this.DiagLeftUp(fieldLU.PozX, fieldLU.PozY, take);
            }
        }
    }

    VerefyField(lu,ld,ru,rd,take){
        var check = true;
        var fields = this.state.board.Fields;
        if(lu)
        var fieldLU = fields.find(i=>i.PozX==lu.PozX-1 && i.PozY==lu.PozY-1);
        if(ld)
        var fieldLD = fields.find(i=>i.PozX==ld.PozX-1 && i.PozY==ld.PozY+1);
        if(ru)
        var fieldRU = fields.find(i=>i.PozX==ru.PozX+1 && i.PozY==ru.PozY-1);
        if(rd)
        var fieldRD = fields.find(i=>i.PozX==rd.PozX+1 && i.PozY==rd.PozY+1);

        if(lu && lu.Check && lu.Check.CheckTypeId!=take.Check.CheckTypeId){
            if(fieldLU && !fieldLU.Check ){
                check=false;
            }
        }

        if(ld && ld.Check && ld.Check.CheckTypeId!=take.Check.CheckTypeId){
            if(fieldLD && !fieldLD.Check ){
                check=false;
            }
        }

        if(ru && ru.Check && ru.Check.CheckTypeId!=take.Check.CheckTypeId){
            if(fieldRU && !fieldRU.Check ){
                check=false;
            }
        }

        if(rd && rd.Check && rd.Check.CheckTypeId!=take.Check.CheckTypeId){
            if(fieldRD && !fieldRD.Check ){
                check=false;
            }
        }

        return check;
    }

    SearchEmptyField(diag,take){
        if(take.Check.IsQuein){
            this.SearchEmptyFieldQuein(diag,take);
            return;
        }
        var checkDelete = this.state.checkDelete;
      
        if(diag[0].Check && diag.length>1 && diag[1].Check){
            return;
        }

        for(let i=0;i<diag.length;i++){    
            if(diag[i].Check && diag[i].Check.CheckTypeId==take.Check.CheckTypeId)
                return;   
            if(diag[i].Check && diag.length-1>i && diag[i+1].Check)
                return; 
            if(diag[i].Check && i>0 && diag[i-1].Check)
                return; 

            if(diag[i].Check && diag.length-1==i){
                return;
            }      

            if(!diag[i].Check && diag[i].FieldTypeId!=3){
            diag[i].FieldTypeId=3;
            checkDelete.push(diag[i-1]);
            checkDelete.push(diag[i]);
            this.setState({checkDelete:checkDelete})
            this.DiagLeftUp(diag[i].PozX,diag[i].PozY,take);
            this.DiagLeftDown(diag[i].PozX,diag[i].PozY,take);
            this.DiagRightUp(diag[i].PozX,diag[i].PozY,take);
            this.DiagRightDown(diag[i].PozX,diag[i].PozY,take);
            }
            
            if(!diag[i].Check && diag.length-1>i && !diag[i+1].Check){
                return;
            }   
        }
        
    }

    SearchEmptyFieldQuein(diag,take){
        var checkDelete = this.state.checkDelete;
        if(diag[0].Check && diag.length<2){
            return;
        }

        for(let i=0;i<diag.length;i++){
            if(diag[i].Check && diag[i].Check.CheckTypeId===take.Check.CheckTypeId){         
                return;  
            }
            if(diag[i].Check && diag.length-1>i && diag[i+1].Check){
                return;  
            }
            if(diag[i].Check && i>0 && diag[i-1].Check){
                return; 
            }

            if(i<diag.length-1 && diag[i].PozX>take.PozX && diag[i].PozX>diag[i+1].PozX){
                if(!diag[i].Check)
                     return;
                take=diag[i].check;
            }

            if(i<diag.length-1 && diag[i].PozX<take.PozX && diag[i].PozX<diag[i+1].PozX){
                if(!diag[i].Check)
                     return;
                take=diag[i].check;
            }

            if(i<diag.length-1 && diag[i].PozY>take.PozY && diag[i].PozY>diag[i+1].PozY){
                if(!diag[i].Check)
                     return;
                take=diag[i].check;
            }

            if(i<diag.length-1 && diag[i].PozY<take.PozY && diag[i].PozY<diag[i+1].PozY){
                if(!diag[i].Check)
                     return;
                take=diag[i].check;
            }
            checkDelete.push(diag[i]);
            this.setState({checkDelete:checkDelete})
            if(diag[i].FieldTypeId!=3 && !diag[i].Check){
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