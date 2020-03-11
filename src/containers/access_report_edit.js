import React from 'react';

export default class AccessReportEdit extends React.Component {

  state = {
    entry: this.props.accRep.entry,
    exit: this.props.accRep.exit,
    employee: this.props.accRep.employee.name,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
    this.props.editAccessRep(this.props.accRep.id, {
      access_report: {
        entry: this.state.entry,
        exit: this.state.exit
      }
    })
  }

  render() {
    return (
      <div>
        <h2>Edit Access Report from Employee {this.state.employee}</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Entry</label>
          <input type="date" name="entry" value={this.state.entry} onChange={this.handleChange.bind(this)}/>
          <label>Exit</label>
          <input type="date" name="exit" value={this.state.exit} onChange={this.handleChange.bind(this)}/>
          <button>Update</button>
        </form>   
      </div>
    )
  }
}
