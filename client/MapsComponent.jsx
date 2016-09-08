import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';
import Marker from './Marker.jsx';

var shallowCompare = require('react-addons-shallow-compare');

export default class SimpleMapPage extends Component {

  constructor(props) {
    super(props);
  }

  static defaultProps = {
      center: {lat: 37.7749, lng: -122.4194},
      zoom: 12,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const Markers =
      this.props.markers
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