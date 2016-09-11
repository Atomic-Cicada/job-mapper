import React, {PropTypes, Component} from 'react';
import SavedJob from './SavedJob.jsx';

export default class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
    };
  }

  componentDidMount() {
    this.getJobs();
  }

  getJobs() {
    let myHeaders = new Headers({
      'Content-Type': 'application/json; charset=utf-8'
    });
    let options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ username: this.props.username}),
    };
    fetch('/getJobs', options).
    then((response) => {
      return response.json().then((data) => {
        var jobs = [];
        data.forEach(function(item) {
          var job = {
            company: item.company,
            jobtitle: item.jobtitle,
            snippet: item.snippet,
            url: item.url
          };
          jobs.push(job);
        });
        this.setState({jobs: jobs});
      });
    })
    .catch((error) => {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  }

  addJob() {
    var job = {
      company: this.props.selected.company,
      jobtitle: this.props.selected.jobtitle,
      snippet: this.props.selected.snippet,
      url: this.props.selected.url
    };
    let myHeaders = new Headers({
      'Content-Type': 'application/json; charset=utf-8'
    });
    let options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ job: job, username: this.props.username}),
    };
    fetch('/addJob', options).
    then((response) => {
      return response.json().then((data) => {
        console.log(data);
      });
    })
    .catch((error) => {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
    this.getJobs();
  }


  render() {
    const Jobs =
        this.state.jobs
        .map((job, index) => (
          <SavedJob
            key={index}
            company={job.company}
            jobtitle={job.jobtitle}
            snippet={job.snippet}
            url={job.url} />
        ));
    return (
      <div className='header'>
        <a onClick={this.props.LogOutUser.bind(this)} href='#'>Logout</a>
        <hr></hr>
        Saved Jobs
        <hr></hr>
        <a onClick={this.addJob.bind(this)} href='#'>Add Job to List</a>;
        <hr></hr>
        {Jobs}
      </div>
    );
  }
}