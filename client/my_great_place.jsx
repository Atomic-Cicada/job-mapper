import React, {PropTypes, Component} from 'react';
// import shouldPureComponentUpdate from 'react-pure-render/function';
var shallowCompare = require('react-addons-shallow-compare');

import {greatPlaceStyle} from './my_great_place_styles.js';

export default class MyGreatPlace extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {};

  // shouldComponentUpdate = shouldPureComponentUpdate;
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
       <div style={greatPlaceStyle}>
          {this.props.text}
       </div>
    );
  }
}