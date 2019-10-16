import React from 'react';
import logo from './logo.svg';
import './LoginForm.css';

class LoginForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {ChangeUser:props.ChangeUser, login: '', password: ''};

      this.onChangeLogin = this.onChangeLogin.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event){
      if(this.state.login.length>0 && this.state.password.length>0){
        fetch("/api/users/postuser",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({Name: this.state.login, Password:this.state.password})
        })
        .then(request => request.json())
        .then(result => this.state.ChangeUser(result))
        .catch(function(res){ console.log(res) })

      }else{
          alert("Поля не могут быть пустыми!")
      }
      event.preventDefault();
    }

    onChangePassword(event){
      this.setState({password: event.target.value});
    }

    onChangeLogin(event) {
      this.setState({login: event.target.value});
    }

    render() {
      return (
        <form onSubmit={this.onSubmit}>
          <p><label> Логин: <input type="text" name="login" value={this.state.login}
                           onChange={this.onChangeLogin}/></label></p>
          <p><label> Пароль: <input type="password" name="password" value={this.state.password}
                            onChange={this.onChangePassword}/></label></p>
          <p><input type="submit" value="Submit" /></p>
        </form>
      );
    }
  }

  export default LoginForm;