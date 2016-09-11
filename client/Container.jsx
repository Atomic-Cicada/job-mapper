import React from 'react';
import ReactDOM from 'react-dom';
import Map, {GoogleApiWrapper} from 'google-maps-react';
import Marker from 'google-maps-react/dist/components/Marker.js';
import InfoWindow from 'google-maps-react/dist/components/InfoWindow.js';
import SearchBar from './SearchBar.jsx';
import UserHome from './UserHome.jsx';
import UserSideBar from './UserSideBar.jsx';


export class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      markers: [],
      register: false,
      loggedIn: false
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.setMarkers = this.setMarkers.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.LogInUser = this.LogInUser.bind(this);
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

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  setMarkers(markerArray) {
    this.setState({
      markers: markerArray
    });
  }

  LogInUser(e) {
    this.setState({loggedIn: true});
  }

  render() {
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

    let sideBar = this.state.loggedIn ? <UserHome /> : <UserSideBar LogInUser={this.LogInUser}/>;

    return (
      <div className='application'>
        <SearchBar setMarkers={this.setMarkers}/>
        <div className='overallContainer'>
          {sideBar}
          <div className='mapContainer'>
          <Map google={this.props.google}
              style={{width: '100%', height: '100%', position: 'relative'}}
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
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY
})(Container);
