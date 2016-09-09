import React, {PropTypes, Component} from 'react';

export default class Signin extends Component {


  constructor(props) {
    super(props);
    this.state = {
      currentUsername: '',
      currentPassword: '',
      message: ''
    };

    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.rejectSignInWrongPassword = this.rejectSignInWrongPassword.bind(this);
    this.rejectSignInWrongUsername = this.rejectSignInWrongUsername.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  rejectSignInWrongPassword() {
    this.setState({message: 'Sorry that is the wrong password'});
  }

  rejectSignInWrongUsername() {
    this.setState({message: 'Sorry that username is not registered'});
  }

  handleSuccess() {
    this.setState({message: 'Great! You are signed in'});
  }

  handleSubmit(e) {
    e.preventDefault();
    $.ajax({
      url: 'http://localhost:3000/login',
      type: 'POST',
      data: JSON.stringify({ username: this.state.currentUsername, password: this.state.currentPassword }),
      contentType: 'application/json; charset=utf-8',
      success: function(data) {
        this.handleSuccess();
      }.bind(this)
    }).fail(function(result) {
      // 305 error corresponds to wrong password
      // 300 error corresponds to no such username found
      if (result.status === 305) {
        this.rejectSignInWrongPassword();
      }
      if (result.status === 300) {
        this.rejectSignInWrongUsername();
      }
    }.bind(this));
  }

  handleUsernameInput(e) {
    this.setState({currentUsername: e.target.value});
  }
  handlePasswordInput(e) {
    this.setState({currentPassword: e.target.value});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>Username<input type="text" name="username" value={this.state.currentUsername} onChange={this.handleUsernameInput}/></div>
          <div>Password<input type="password" name="password" value={this.state.currentPassword} onChange={this.handlePasswordInput} /></div>
          <input type="submit" name="submit"/>
          <p>{this.state.message}</p>
        </form>
      </div>
    );
  }
}
