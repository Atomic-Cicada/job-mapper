import React, {PropTypes, Component} from 'react';

export default class Signin extends Component {


  constructor(props) {
    super(props);
    this.state = {
      currentUsername: '',
      currentPassword: '',
    };

    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    $.ajax({
      url: 'http://localhost:3000/login',
      type: 'POST',
      data: JSON.stringify({ username: this.state.currentUsername, password: this.state.currentPassword }),
      contentType: 'application/json; charset=utf-8',
      success: function(data) {
        console.log('ok we are getting a success response ', data);
      }.bind(this)
    }).fail(function(result) {
      console.log('you are failing man ', result);
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
        </form>
      </div>
    );
  }
}
