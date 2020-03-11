import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Login from './containers/login';
import Signup from './containers/signup';
import AdminDashboard from './containers/admin_dashboard';


class App extends React.Component {

  state = {
    login: {
      username: null,
      password: null,
    },
    employees: [],
    auth_token: null,
    error: null,
    toLogin: true,
    toSignup: false,
    toAminDash: false,
    toEmployeeDash: false,
    admin: false,
    api_url: 'https://evening-tundra-23085.herokuapp.com'
  }

  componentDidMount() {
    if(this.auth_token === null) {
      this.props.history.push('/')
    }
  }

  handleSubmit(e) {

    e.preventDefault();
    const data = {
      username: 'User Admin',
      password: '123456'
    }

    fetch(`${this.state.api_url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) { throw res }
        return res.json()
      })
      .then(res => this.setState({
        auth_token: res.auth_token
      }))
      .catch(err => {
        err.text().then( errorMessage => {
          this.setState({error: JSON.parse(errorMessage).message})
        })
      })
  }

  handleSignup(form) {
    const data = {
      name: form.name,
      username: form.username,
      password: form.password,
      password_confirmation: form.password_confirmation,
    }

    fetch(`${this.state.api_url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: data})
    })
      .then(res => {
        if (!res.ok) { throw res }
        return res.json()
      })
      .then(res => this.setState({
        auth_token: res.auth_token,
        admin: res.admin
      }))
      .catch(err => {
        console.log(err)
      })
  }

  handleLogin = (form) => {
    const data = {
      username: form.username,
      password: form.password
    }

    fetch(`${this.state.api_url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) { throw res }
        return res.json()
      })
      .then(res => this.setState({
        auth_token: res.auth_token,
        admin: res.admin
      }))
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h1 className="primary-title">Employee Checker Client</h1>
          <div className="ApiUrl">
            <label for="api_url">API URL:</label>
            <input value={this.state.api_url} name="api_url" onChange={(e) => {
              this.setState({
                api_url: e.target.value
              })
            }}></input>
          </div>

          {
            this.state.auth_token
            ? this.state.admin
              ? <AdminDashboard auth_token={this.state.auth_token} api_url={this.state.api_url} />
              : <div>Employee Dashboard</div>
            : this.state.toLogin 
              ? <div>
                  <Login login={this.handleLogin.bind(this)}/>
                  <span onClick={() => {
                    this.setState({
                      toSignup: true,
                      toLogin: false
                    })
                  }}>Signup instead</span>
                </div>
              : <div> 
                  <Signup signup={this.handleSignup.bind(this)}></Signup>
                  <span onClick={() => {
                    this.setState({
                      toLogin: true,
                      toSignup: false,
                    })
                  }}>Login instead</span>
                </div>
          }
          <span className="Error-Message">{this.state.error}</span>
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
