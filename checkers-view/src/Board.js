import React from 'react';
import logo from './logo.svg';
import './Board.css';
import Field from './Field';
class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board:props.board,
            FieldTake:{},
            fields:[]
        }
        this.FiledClick = this.FiledClick.bind(this);
    }
    componentDidMount(){
        this.FillBoard();
    }
    FillBoard() {
        var field = this.state.fields;         
        var color = 2; 
            var checkers = this.state.board.Checkers;
            for(let i=0;i<8;i++){
                color =(i%2==0)?2:1;
                for(let j=0;j<8;j++){
                   color=(color===2)?1:2;
                    var check = {};
                    check = checkers.find(item => item.PozX === j && item.PozY===i);
                    if(check)
                    check['class']="null";
                    field.push(<Field fieldType={color} check={check} key={i+''+j} click={this.FiledClick} pozX={j} pozY={i} class="field "></Field>)
                }
            }
        this.setState({fields:field});
    }

    FiledClick(e,item){
        this.setState({FieldTake:e});
        var fields = this.state.fields;
            fields.forEach(element => {
                fields[fields.indexOf(element)] = <Field fieldType={element.props.fieldType} check={element.props.check} key={element.key} click={element.props.click} pozX={element.props.pozX} pozY={element.props.pozY} class="field "></Field>
            });
        if(this.state.FieldTake['onClick'])
            this.state.FieldTake.onClick();

           // e.onClick();
            var pozX = e.props.pozX;
            var pozY = e.props.pozY;
            var checker = this.state.board.Checkers.find(i=>i.PozX==pozX && i.PozY==pozY);
            if(checker){                     
                var field1 = fields.find(i=>i.props.pozX===pozX-1 && i.props.pozY===pozY+1);
                var field2 = fields.find(i=>i.props.pozX===pozX+1 && i.props.pozY===pozY+1);
                if(field1){
                    this.CheckInCheck(field1);
                }
                if(field2){
                    this.CheckInCheck(field2);
                }
               // fields[fields.indexOf(e)] = <Field fieldType={e.props.fieldType} check={e.props.check} key={e.key} click={this.FiledClick} pozX={pozX} pozY={pozY} class="field field_check"></Field>
              //  this.setState({fields:fields});
            }
    }

    CheckInCheck(field){
        var fields = this.state.fields;
        if(!field.props.check)
        fields[fields.indexOf(field)] = <Field fieldType={field.props.fieldType} check={field.props.check} key={field.key} click={field.props.click} pozX={field.props.pozX} pozY={field.props.pozY} class="field field_click"></Field>
        else if(field.props.check.CheckTypeId && field.props.check.CheckTypeId!=this.state.FieldTake.props.check.CheckTypeId){
            var fieldWithCheck1 = fields.find(i=>i.props.pozX===field.props.pozX-1 && i.props.pozY===field.props.pozY+1);
            var fieldWithCheck2 = fields.find(i=>i.props.pozX===field.props.pozX+1 && i.props.pozY===field.props.pozY+1);
            if(fieldWithCheck1){
                this.CheckInCheck(fieldWithCheck1);
            }
            if(fieldWithCheck2){
                this.CheckInCheck(fieldWithCheck2);
            }
        }
        this.setState({fields:fields});
    }
    render() 
    {
        return (
          <div className="board">
              {this.state.fields.map((item, i) => item)}
          </div>
        )
    }
}

export default Board;