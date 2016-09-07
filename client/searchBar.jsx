import React, {PropTypes, Component} from 'react';



export default class SearchBar extends Component {
  static defaultProps = {

  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='SearchBar'>
	      <form>
	        <div class='searchLabel'>Job Title:<input type="text" name="job"/></div>
	        <div class='searchLabel'>City:<input type="text" name="city"/></div>
	        <input type="submit" name="submit"/>
	      </form>
      </div>
    );
  }
}


