import React, {PropTypes, Component} from 'react';

export default class SavedJob extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <div>{this.props.company}</div>
      <div>{this.props.jobtitle}</div>
      <div>{this.props.snippet}</div>
      <div><a href={this.props.url}>Link</a></div>
      <div><a onClick={this.props.removeJob.bind(this)} href='#'>Remove job</a></div>
      <hr></hr>
      </div>
    );
  }
}