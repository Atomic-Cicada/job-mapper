import React, {PropTypes, Component} from 'react';

export default class SearchBar extends Component {
  // static defaultProps = {

  // };

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
    $.ajax({
      url: 'http://localhost:3000/indeed',
      type: 'POST',
      dataType: 'json',
      data: '{job: this.state.currentJob, city: this.state.currentCity}',
      success: console.log('ok sent')

    })
  }

  handleJobSearch(e) {
    this.setState({currentJob: e.target.value});
    //console.log(this)
  }
  handleCitySearch(e) {
    this.setState({currentCity: e.target.value});
    //console.log(this)
  }

  render() {
    return (
      <div id='SearchBar'>
        <form onSubmit={this.handleSubmit}>
          <div className='searchLabel'>Job Title:<input type="text" name="job" value={this.state.currentJob} onChange={this.handleJobSearch}/></div>
          <div className='searchLabel'>City:<input type="text" name="city" value={this.state.currentCity} onChange={this.handleCitySearch} /></div>
          <input type="submit" name="submit"/>
        </form>
      </div>
    );
  }
}
