import React from 'react';

export default class Signup extends React.Component {
  state =  {
    name: '',
    username: '',
    password: '',
    password_confirmation: '',
  }

  handleForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signup({
      name: this.state.name,
      username: this.state.username, 
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    })
  }

  render() {

    const { name, username, password, password_confirmation } = this.state

    return (
      <div className="Signup block-padding">
        <h2 className="Signup-Title secondary-title">Signup</h2>
        <form className="Signup-Form block-padding" onSubmit={this.handleSubmit.bind(this)}>
          <label for="username">Name</label>
          <input value={ name } name="name" onChange={this.handleForm}></input>
          <label for="username">Username</label>
          <input value={ username } name="username" onChange={this.handleForm}></input>
          <label for="password">Password</label>
          <input value={ password } name="password" onChange={this.handleForm}></input>
          <label for="password_confirmation">Password Confirmation</label>
          <input value={ password_confirmation } name="password_confirmation" onChange={this.handleForm}></input>
          <button className="btn" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}