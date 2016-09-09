import React, {PropTypes, Component} from 'react';

export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUsername: '',
      currentPassword: '',
      currentConfirmation: '',
      message: '',
      exists: false
    };
  }

  userExists() {
    // Here we need to use Mongoose to check if this.state.currentUsername is already in our database
      // if it exists
        // return true
      // else
        // return false
    console.log('ok we running the userExists() function breh');

    // STILL NEED TO MAKE USERS ROUTE
    $.ajax({
      url: 'http://localhost:3000/users',
      type: 'POST',
      data: JSON.stringify({ currentUsername: this.state.currentUsername }),
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      success: function(data) {
        if (data.status === 200) {
          this.setState({ exists: true });
        }
      }.bind(this)
    });
  }

  rejectUserTakenUsername() {
    this.setState({message: 'Sorry that username is already taken'});
  }

  rejectUserBadPassword() {
    this.setState({message: 'Sorry your passwords do not add up'});
  }

  addUser() {
    // Here we need to use Mongoose to add this particular user to the database
    this.setState({message: 'Sucess! You have signed up'});
  }


  // This handleSubmit function should be refactored to check for an already existing user before the user submits their password
  // not after they have done all the work of adding it, like it currently is.
  handleSubmit(e) {
    e.preventDefault();
    if (this.userExists() === false) {
      if (this.state.currentPassword === this.state.currentConfirmation) {
        this.addUser();
      } else {
        this.rejectUserBadPassword();
      }
    } else {
      this.rejectUserTakenUsername();
    }

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
