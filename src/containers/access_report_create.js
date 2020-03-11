import React from 'react';

export default class AccessReportCreate extends React.Component {

  state = {
    employee_id: this.props.employee.id,
    entry: '',
    exit: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    console.log(this.state)
    e.preventDefault();
    this.props.addAccessReport({
      access_report: {
        ...this.state
      }
    })
  }

  render() {
    return (
      <div>
        <h2>Edit Employee {this.state.name} info</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Entry</label>
          <input type="datetime-local" name="entry" value={this.state.entry} onChange={this.handleChange.bind(this)}/>
          <label>Exit</label>
          <input type="datetime-local" name="exit" value={this.state.exit} onChange={this.handleChange.bind(this)}/>
          <button>Create</button>
        </form>   
      </div>
    )
  }
}
