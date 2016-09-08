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
    // $.ajax({
    //   url: 'http://localhost:3000/indeed',
    //   type: 'POST',
    //   data: JSON.stringify({ job: this.state.currentJob, city: this.state.currentCity }),
    //   dataType: 'json',
    //   contentType: 'application/json; charset=utf-8',
    //   success: function(data) {
    //     var markers = [];
    //     data.forEach(function(job) {
    //       var marker = {lat: job.city.lat, lng: job.city.long};
    //       markers.push(marker);
    //     });
    //     this.props.setMarkers(markers);
    //   }.bind(this)
    // });
    console.log('signin being called correctly. user: ', this.state.currentUsername);
    console.log('pw: ', this.state.currentPassword);
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
          <div>Password<input type="text" name="password" value={this.state.currentPassword} onChange={this.handlePasswordInput} /></div>
          <input type="submit" name="submit"/>
        </form>
      </div>
    );
  }
}
