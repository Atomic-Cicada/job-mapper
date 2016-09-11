import React from 'react';
import ReactDOM from 'react-dom';
import Signin from './Signin.jsx';
import Register from './Register.jsx';

export default class UserSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      register: false,
    };
  }

  handleRegister(e) {
    this.setState({register: true});
  }

  handleSignIn(e) {
    this.setState({register: false});
  }

  render() {
    let signInHeader;
    let signInButton;
    let signIntext;
    if (this.state.register) {
      signInHeader = <h1>Register:</h1>;
      signInButton = <Register />;
      signIntext = <a onClick={this.handleSignIn.bind(this)} href='#'>Already have an account? Sign in here</a>;
    } else {
      signInHeader = <h1>Sign in:</h1>;
      signInButton = <Signin LogInUser={this.props.LogInUser}/>;
      signIntext = <a onClick={this.handleRegister.bind(this)} href='#'>Register</a>;
    }

    return (
      <div className='header'>
        {signIntext}
        {signInHeader}
        {signInButton}
      </div>
    );
  }
}