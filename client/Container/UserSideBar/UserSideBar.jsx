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
      signInHeader = <h2>Register:</h2>;
      signInButton = <Register />;
      signIntext = <div className='sign-in-register-btn'><a onClick={this.handleSignIn.bind(this)} href='#'>Already have an account? Sign in here</a></div>;
    } else {
      signInHeader = <h2>Sign in:</h2>;
      signInButton = <Signin LogInUser={this.props.LogInUser}/>;
      signIntext = <div className='sign-in-register-btn'><a onClick={this.handleRegister.bind(this)} href='#'>Register</a></div>;
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
