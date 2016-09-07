import React, {PropTypes, Component} from 'react';

export default class FilterBar extends Component {


  constructor(props) {
    super(props);
    this.state= {
      posted: 'all'
    };

    var postedOptions = ['all', 'week', 'month'];

    // this.handleJobSearch = this.handleJobSearch.bind(this);
    // this.handleCitySearch = this.handleCitySearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();

    // console.log('handle being called')
    // $.ajax({
    //   url: 'http://localhost:3000/indeed',
    //   type: 'POST',
    //   dataType: 'json',
    //   data: '{job: this.state.currentJob, city: this.state.currentCity}',
    //   success: console.log('ok sent')

    // })
  }

  // handleJobSearch(e) {
  //   this.setState({currentJob: e.target.value});
  // }
  // handleCitySearch(e) {
  //   this.setState({currentCity: e.target.value});
  // }

  render() {
    return (
      <div id="Filter">
        <h1>Filter</h1>
        <Posted posted={this.state.posted} handleChange={this.handleChange} />
      </div>
    );
  }
}

default class Posted extends Component {
  render() {
    return (
      <div id="Posted">
        <h1>Posted in last:</h1>
        <select onChange={this.props.handleChange} value={this.props.posted}>
          <option value="month">month</option>
          <option value="week">week</option>
          <option value="3days">3 days</option>
        </select>
      </div>
    );
  }
}


  // Render filter section
  // Render 'Posted in' section
  // Go through results array and toggle off 'shown' property
