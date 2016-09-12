import React, {PropTypes, Component} from 'react';
import SavedJob from './SavedJob.jsx';

export default class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
    };
    this.removeJob = this.removeJob.bind(this);
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
            url: item.url,
            jobkey: item.jobkey
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
      url: this.props.selected.url,
      jobkey: this.props.selected.jobkey
    };
    let myHeaders = new Headers({
      'Content-Type': 'application/json; charset=utf-8'
    });
    let options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ job: job, username: this.props.username}),
    };
    fetch('/addJob', options)
    .catch((error) => {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
    this.getJobs();
  }

  removeJob(jobkey) {
    event.preventDefault();
    let myHeaders = new Headers({
      'Content-Type': 'application/json; charset=utf-8'
    });
    let options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({jobkey: jobkey, username: this.props.username})
    };
    fetch('/removeJob', options)
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
            url={job.url}
            jobkey={job.jobkey}
            removeJob={this.removeJob} />
        ));
    return (
      <div className='sidebar'>
        <div className='sidebarheaders'>
          <a onClick={this.props.LogOutUser.bind(this)} href='#'>Logout</a>
          <hr></hr>
          Saved Jobs
          <hr></hr>
          <a onClick={this.addJob.bind(this)} href='#'>Add Job to List</a>
          <hr></hr>
        </div>
        <div className='savedjobs'>
          {Jobs}
        </div>
      </div>
    );
  }
}
