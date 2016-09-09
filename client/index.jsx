import React from 'react';
import {render} from 'react-dom';
import MapComponent from './MapsComponent.jsx';
import SearchBar from './SearchBar.jsx';
import Signin from './Signin.jsx';
import Register from './Register.jsx';

require('./main.css');
// import Filter from './FilterBar.jsx';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      register: false
    };
    this.setMarkers = this.setMarkers.bind(this);
  }

  setMarkers(markerArray) {
    this.setState({
      markers: markerArray
    });
  }

  handleRegister(e) {
    this.setState({register: true});
  }

  handleSignIn(e) {
    this.setState({register: false});
  }

  render () {
    if (this.state.register) {
      return (
      <div>
        <SearchBar setMarkers={this.setMarkers}/>
        <h1>Register:</h1>
        <Register />
        <a onClick={this.handleSignIn.bind(this)} href='#'>Already have an account? Sign in here</a>
        <div id='mapContainer'><MapComponent markers={this.state.markers} /></div>
      </div>
    );
    } else {
      return (
      <div>
        <SearchBar setMarkers={this.setMarkers}/>
        <h1>Sign in:</h1>
        <Signin />
        <a onClick={this.handleRegister.bind(this)} href='#'>Register</a>
        <div id='mapContainer'><MapComponent markers={this.state.markers} /></div>
      </div>
    );
    }

  }
}

// MapComponent needs following props passed down: markers
// Also MapComponent needs to bring down the props (need to call super(props))

render(<App/>, document.getElementById('app'));