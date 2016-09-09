import React from 'react';
import ReactDOM from 'react-dom';
import Map, {GoogleApiWrapper} from 'google-maps-react';
import Marker from 'google-maps-react/dist/components/Marker.js';
import InfoWindow from 'google-maps-react/dist/components/InfoWindow.js';
// import Map from './Map.jsx';
import SearchBar from './SearchBar.jsx';
import Signin from './Signin.jsx';
import Register from './Register.jsx';

export class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      markers: [],
      register: false
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.setMarkers = this.setMarkers.bind(this);
  }

  handleRegister(e) {
    this.setState({register: true});
  }

  handleSignIn(e) {
    this.setState({register: false});
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onInfoWindowClose() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }

  setMarkers(markerArray) {
    this.setState({
      markers: markerArray
    });
  }

  render() {

    // MARKER CREATION
    const Markers =
        this.state.markers
        .map((marker, index) => (
          <Marker
            key={index}
            onClick={this.onMarkerClick}
            company={marker['company']}
            jobtitle={marker['jobtitle']}
            snippet={marker['snippet']}
            url={marker['url']}
            position={{lat: marker['lat'], lng: marker['lng']}} />
        ));

    if (this.state.register) {
      return (
        <div>
          <SearchBar setMarkers={this.setMarkers}/>
          <h1>Register:</h1>
          <Register /><br/><br/>
          <a onClick={this.handleSignIn.bind(this)} href='#'>Already have an account? Sign in here</a>
          <Map google={this.props.google}
              style={{width: '50%', height: '50%', position: 'relative'}}
              className={'map'}
              zoom={14}
              onClick={this.onMapClicked}
              onDragend={this.onMapMoved}>
            {Markers}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onInfoWindowClose}>
                <div>
                  <h2>{this.state.selectedPlace.company}</h2>
                  <h3>{this.state.selectedPlace.jobtitle}</h3>
                  <h4>{this.state.selectedPlace.snippet}</h4>
                  <div><a href={this.state.selectedPlace.url}>Click to View</a></div>
              </div>
            </InfoWindow>
          </Map>
        </div>
      );
    } else {
      return (
      <div>
        <SearchBar setMarkers={this.setMarkers}/>
        <h1>Sign in:</h1>
        <Signin />
        <a onClick={this.handleRegister.bind(this)} href='#'>Register</a>
        <Map google={this.props.google}
            style={{width: '50%', height: '50%', position: 'relative'}}
            className={'map'}
            zoom={14}
            onClick={this.onMapClicked}
            onDragend={this.onMapMoved}>
          {Markers}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onInfoWindowClose}>
              <div>
                <h2>{this.state.selectedPlace.company}</h2>
                <h3>{this.state.selectedPlace.jobtitle}</h3>
                <h4>{this.state.selectedPlace.snippet}</h4>
                <div><a href={this.state.selectedPlace.url}>Click to View</a></div>
              </div>
          </InfoWindow>
        </Map>
      </div>
    );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY
})(Container);
