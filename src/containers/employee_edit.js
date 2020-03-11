import React from 'react';

export default class EmployeeEdit extends React.Component {

  state = {
    name: this.props.employee.name,
    username: this.props.employee.username,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.editEmployee(this.props.employee.id, {
      user: {
        username: this.state.username,
        name: this.state.name
      }
    })
  }

  render() {
    return (
      <div>
        <h2>Edit Employee {this.state.name} info</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
          <label>Username</label>
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange.bind(this)}/>
          <button>Update</button>
        </form>   
      </div>
    )
  }
}
