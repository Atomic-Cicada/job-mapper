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

    this.rejectUserTakenUsername = this.rejectUserTakenUsername.bind(this);
    this.rejectUserBadPassword = this.rejectUserBadPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addUser = this.addUser.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleConfirmPasswordInput = this.handleConfirmPasswordInput.bind(this);
  }

  userExists() {
    // Here we need to use Mongoose to check if this.state.currentUsername is already in our database
      // if it exists
        // return true
      // else
        // return false

    // STILL NEED TO MAKE USERS ROUTE
    $.ajax({
      url: 'http://localhost:3000/users',
      type: 'POST',
      data: JSON.stringify({ currentUsername: this.state.currentUsername,
        currentPassword: this.state.currentPassword }),
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      success: function(data) {
        console.log('and the data is', data);
        if (data.statusCode === 200) {
          this.setState({ exists: true });
        }
      }.bind(this)
    }).done(function(result) {
      console.log('inside of done', result);
    }).fail(function(result) {
      console.log('ok some sort of fail', result);
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
    this.userExists();
    // if the new username entered has not been taken then procceed
    if (this.state.exists === false) {
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
