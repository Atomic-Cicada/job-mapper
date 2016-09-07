import React from 'react';
import {render} from 'react-dom';
import MapComponent from './MapsComponent.jsx';
import SearchBar from './SearchBar.jsx';
import {mainAppStyle} from './main_app_style.js';


class App extends React.Component {
  render () {
    return (
    	<div style={mainAppStyle}>
        <MapComponent />
        <SearchBar />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));