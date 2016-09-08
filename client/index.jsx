import React from 'react';
import {render} from 'react-dom';
import MapComponent from './MapsComponent.jsx';
import SearchBar from './SearchBar.jsx';
require('./main.css');
// import Filter from './FilterBar.jsx';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      markers: []
    };
    this.setMarkers = this.setMarkers.bind(this);
  }

  setMarkers(markerArray) {
    this.setState({
      markers: markerArray
    });
  }

  render () {
    return (
      <div>
        <SearchBar setMarkers={this.setMarkers}/>
        <div id='mapContainer'><MapComponent markers={this.state.markers} /></div>
      </div>
    );
  }
}

// MapComponent needs following props passed down: markers
// Also MapComponent needs to bring down the props (need to call super(props))

render(<App/>, document.getElementById('app'));