import React from 'react';
import {render} from 'react-dom';
import MapComponent from './MapsComponent.jsx';

class App extends React.Component {
  render () {
    return (
      <MapComponent />
    );
  }
}

render(<App/>, document.getElementById('app'));