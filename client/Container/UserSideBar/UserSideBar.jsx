import React from 'react';
import ReactDOM from 'react-dom';
import Signin from './Signin.jsx';
import Register from './Register.jsx';

export default class UserSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      register: false
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

    // register and signin toggle
    if (this.state.register) {
      signInHeader = <h2>Register:</h2>;
      signInButton = <Register/>;
      signIntext = <a className='sign-in-register-btn' onClick={this.handleSignIn.bind(this)} href='#'><span className='button'>Sign In</span></a>;
    } else {
      signInHeader = <h2>Sign in:</h2>;
      signInButton = <Signin LogInUser={this.props.LogInUser}/>;
      signIntext = <a className='sign-in-register-btn' onClick={this.handleRegister.bind(this)} href='#'><span className='button'>Register</span></a>;
    }

    return (
      <div className='sidebar'>
        {signIntext}
        <div className='login'>
          {signInHeader}
          {signInButton}
        </div>
      </div>
    );
  }
}
