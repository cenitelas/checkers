import React from 'react';

class Time extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time:props.time,
            newTime:0
        }
    }

    componentDidMount(){
        this.intervalP = setInterval(() =>{
            var tt = this.state.time;
            if(tt && tt.MoveTime){
            var time = tt.MoveTime.split("T")[1].split(".")[0].split(":");
            var date = new Date();
            var newDate = new Date();
            newDate.setHours(time[0]);
            newDate.setMinutes(time[1]);
            newDate.setSeconds(time[2]);
            this.setState({newTime:(newDate-date)/1000});
            }         
        }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.intervalP);
    }
    render() {
        return (
          this.state.newTime
        )
    }
}

export default Time;