import React from 'react';
import {render} from 'react-dom';
import MapComponent from './MapsComponent.jsx';
import SearchBar from './SearchBar.jsx';
import {greatPlaceStyle} from './my_great_place_styles.js';


class App extends React.Component {
  render () {
    return (
    	<div>
        <SearchBar />
        <div id='mapContainer'><MapComponent /></div>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));

//style={greatPlaceStyle}