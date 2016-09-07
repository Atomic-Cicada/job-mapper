import React, {PropTypes, Component} from 'react';
import {markerStyle} from './MarkerStyle.js';

var shallowCompare = require('react-addons-shallow-compare');

export default class Marker extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {};

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
       <div style={markerStyle}>
          {this.props.text}
       </div>
    );
  }
}