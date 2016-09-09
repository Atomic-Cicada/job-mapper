import React, {PropTypes, Component} from 'react';

export default class SearchBar extends Component {


  constructor(props) {
    super(props);
    this.state = {
      currentJob: '',
      currentCity: ''
    };

    this.handleJobSearch = this.handleJobSearch.bind(this);
    this.handleCitySearch = this.handleCitySearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    $.ajax({
      url: '/indeed',
      type: 'POST',
      data: JSON.stringify({ job: this.state.currentJob, city: this.state.currentCity }),
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      success: function(data) {
        var markers = [];
        data.forEach(function(job) {
          var marker = {
            lat: job.latitude,
            lng: job.longitude,
            company: job.company,
            jobtitle: job.jobtitle,
            snippet: job.snippet,
            url: job.url
          };
          markers.push(marker);
        });
        this.props.setMarkers(markers);
      }.bind(this)
    });
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
