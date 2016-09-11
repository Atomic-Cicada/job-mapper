import React, {PropTypes, Component} from 'react';

export default class UserHome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='header'>
        Logged In - Viewing Jobs
      </div>
    );
  }
}