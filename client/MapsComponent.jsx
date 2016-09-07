import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';
import Marker from './Marker.jsx';

var shallowCompare = require('react-addons-shallow-compare');

export default class SimpleMapPage extends Component {
  static defaultProps = {
    center: {lat: 37.7749, lng: -122.4194},
    zoom: 12,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  constructor(props) {
    super(props);

    this.state = {
      markers: [
        {lat: 37.7836966, lng: -122.4089664},
        {lat : 37.7868619, lng : -122.403914},
        {lat : 37.7823802, lng : -122.4052253}
      ]
    }
  }

  setMarkers(markerArray) {
    this.setState({
      markers: markerArray
    });
  }

  render() {
    const Markers = 
      this.state.markers
      .map((marker, index) => (
        <Marker
          // required props
          key={index}
          lat={marker['lat']}
          lng={marker['lng']}
          // any user props
          marker={marker} />
      ));

    return (
       <GoogleMap
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}>
        {Markers}
      </GoogleMap>
    );
  }
}

// <MyGreatPlace {...this.props.greatPlaceCoords} text={'B'} /* road circle */ />
// <MyGreatPlace lat={59.955413} lng={30.337844} text={'A'} /* Kreyser Avrora */ />