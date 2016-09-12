import React, {PropTypes, Component} from 'react';

export default class SavedJob extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>{this.props.company}</h3>
        <h4>{this.props.jobtitle}</h4>
        <div>{this.props.snippet}</div>
        <div><a href={this.props.url}>Link</a></div>
        <div><a onClick={()=>this.props.removeJob(this.props.jobkey)} href='#'>Remove job</a></div>
        <hr></hr>
      </div>
    );
  }
}
