import React from 'react';

export default class Login extends React.Component {
  state =  {
    username: '',
    password: '',
  }

  handleForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.login({username: this.state.username, password: this.state.password})
  }

  render() {

    const { username, password } = this.state

    return (
      <div className="Login block-padding">
        <h2 className="Login-Title secondary-title">Login</h2>
        <form className="Login-Form block-padding" onSubmit={this.handleSubmit.bind(this)}>
          <label for="username">Username</label>
          <input value={ username } name="username" onChange={this.handleForm}></input>
          <label for="password">Password</label>
          <input value={ password } name="password" onChange={this.handleForm}></input>
          <button className="btn" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}