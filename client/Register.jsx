import React, {PropTypes, Component} from 'react';

export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUsername: '',
      currentPassword: '',
      currentConfirmation: '',
      message: ''
    };

    this.rejectUserTakenUsername = this.rejectUserTakenUsername.bind(this);
    this.rejectUserBadPassword = this.rejectUserBadPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addUser = this.addUser.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleConfirmPasswordInput = this.handleConfirmPasswordInput.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.passwordTest = this.passwordTest.bind(this);
  }

  addUser() {
    $.ajax({
      url: 'http://localhost:3000/users',
      type: 'POST',
      data: JSON.stringify({ currentUsername: this.state.currentUsername,
        currentPassword: this.state.currentPassword }),
      contentType: 'application/json; charset=utf-8',
      success: function(data) {
        this.handleSuccess();
      }.bind(this)
    }).fail(function(result) {
      this.rejectUserTakenUsername();
    }.bind(this));
  }

  rejectUserTakenUsername() {
    this.setState({message: 'Sorry that username is already taken'});
  }

  rejectUserBadPassword() {
    this.setState({message: 'Sorry your passwords do not add up'});
  }

  handleSuccess() {
    this.setState({message: 'Sucess! You have signed up'});
  }

  passwordTest() {
    if (this.state.currentPassword !== this.state.currentConfirmation) {
      return false;
    }
    if (this.state.currentPassword.length < 7) {
      return false;
    }
    return true;
  }

  // This handleSubmit function should be refactored to check for an already existing user before the user submits their password
  // not after they have done all the work of adding it, like it currently is.
  handleSubmit(e) {
    e.preventDefault();
    // If the password is acceptable and the confirm matches original typed then add user
    if (this.passwordTest()) {
      this.addUser();
    } else {
      this.rejectUserBadPassword();
    }
  }

  handleUsernameInput(e) {
    this.setState({currentUsername: e.target.value});
  }
  handlePasswordInput(e) {
    this.setState({currentPassword: e.target.value});
  }
  handleConfirmPasswordInput(e) {
    this.setState({currentConfirmation: e.target.value});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>Username<input type="text" name="username" value={this.state.currentUsername} onChange={this.handleUsernameInput}/></div>
          <div>Password<input type="text" name="password" value={this.state.currentPassword} onChange={this.handlePasswordInput} /></div>
          <div>Confirm Password<input type="text" name="password confirm" value={this.state.currentConfirmation} onChange={this.handleConfirmPasswordInput} /></div>
          <input type="submit" name="submit"/>
          <p>{this.state.message}</p>
        </form>
      </div>
    );
  }
}
