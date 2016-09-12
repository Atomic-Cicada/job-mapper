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
    let myHeaders = new Headers({'Content-Type': 'application/json; charset=utf-8'});
    let options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({job: this.state.currentJob, city: this.state.currentCity})
    };
    fetch('/indeed', options).then((response) => {
      return response.json().then((data) => {
        var markers = [];
        data.forEach((job) => {
          var marker = {
            lat: job.latitude,
            lng: job.longitude,
            company: job.company,
            jobtitle: job.jobtitle,
            snippet: job.snippet,
            url: job.url,
            jobkey: job.jobkey
          };
          markers.push(marker);
        });
        this.props.setMarkers(markers);
      });
    }).catch((error) => {
      console.log('There has been a problem with your fetch operation: ' + error.message);
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
      <div id='search-bar'>
        <h1>JobMapper</h1>
        <div className='search-div'>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input className='search-box' type="text" name="job" value={this.state.currentJob} placeholder='Search Job' onChange={this.handleJobSearch}/>
          </form>
        </div>
        {/* <div className='searchLabel'>
        City:<input type="text" name="city" value={this.state.currentCity} onChange={this.handleCitySearch} />
      </div> */}
      </div>
    );
  }
}
