import React, {PropTypes, Component} from 'react';

export default class SearchBar extends Component {


  constructor(props) {
    super(props);
    this.state= {
      currentJob: '',
      currentCity: ''
    };

    this.handleJobSearch = this.handleJobSearch.bind(this);
    this.handleCitySearch = this.handleCitySearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props);
    $.ajax({
      url: 'http://localhost:3000/indeed',
      type: 'GET',
      dataType: 'json',
      //data: '{job: this.state.currentJob, city: this.state.currentCity}',
      success: function(data) {
        var newMarkers = [];
        data.forEach(function(job) {
          var marker = {lat: job.city.lat, lng: job.city.long};
          newMarkers.push(marker);
        })
        this.props.setMarkers(newMarkers);
      }.bind(this)

    })
  }

  handleJobSearch(e) {
    this.setState({currentJob: e.target.value});
  }
  handleCitySearch(e) {
    this.setState({currentCity: e.target.value});
  }

  render() {
    return (
      <div id='SearchBar'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className='searchLabel'>Job Title:<input type="text" name="job" value={this.state.currentJob} onChange={this.handleJobSearch}/></div>
          <div className='searchLabel'>City:<input type="text" name="city" value={this.state.currentCity} onChange={this.handleCitySearch} /></div>
          <input type="submit" name="submit"/>
        </form>
      </div>
    );
  }
}
