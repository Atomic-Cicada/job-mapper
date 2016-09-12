import React, {PropTypes, Component} from 'react';

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsername: '',
      currentPassword: '',
      message: '' // This will display the status message to the user (depending on whether passwords match up, correct username entered, etc)
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
    this.props.LogInUser(this.state.currentUsername);
  }

  handleSubmit(e) {
    e.preventDefault();
    let myHeaders = new Headers({
      'Content-Type': 'application/json; charset=utf-8'
    });
    let options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ username: this.state.currentUsername, password: this.state.currentPassword })
    };
    fetch('/login', options).
    then((response) => {
      if (response.status === 305) {
        this.rejectSignInWrongPassword();
      } else if (response.status === 300) {
        this.rejectSignInWrongUsername();
      } else {
        this.handleSuccess();
      }
    })
    .catch((error) => {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
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
        <form onSubmit={this.handleSubmit}>
          <div>Username<br/><input type="text" name="username" value={this.state.currentUsername} onChange={this.handleUsernameInput}/></div>
          <div>Password<br/><input type="password" name="password" value={this.state.currentPassword} onChange={this.handlePasswordInput} /></div>
          <br/>
          <div className='input-button-div'>
            <input type="submit" name="submit" className='input-button'/>
          </div>
          <br/>
          <p>{this.state.message}</p>
        </form>
      </div>
    );
  }
}
