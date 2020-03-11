import React from 'react';
import './App.scss';
import Login from './containers/login';
import Signup from './containers/signup';
import Dashboard from './containers/dashboard';


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

  }

  handleSubmit(e) {

    e.preventDefault();
    console.log("submitting")
    const heroku = 'https://evening-tundra-23085.herokuapp.com'
    const local = 'http://localhost:3000';
    const data = {
      username: 'User Admin',
      password: '123456'
    }

    fetch(`${heroku}/login`, {
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
  // local admin MontiPython => eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1ODM5MzU3MzN9.uTTAesIjAhl2D-mcSgV3MFjhlJ8FZ8qUT_NYSnxLxVQ
  // local DiegoLuis => eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyNCwiZXhwIjoxNTgzOTM0ODk2fQ.X1uNMT9dI0eBXvY0T-_Cf5Sj2RM4yAvD1AaDTNcI6cQ
  // heroku admin => eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1ODM5Mzg2MTN9.6IHDrc2UthsoggSsZtpfe3bQFDh-0f1oD3o1YPKke5g
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
        auth_token: res.auth_token
      }))
      .catch(err => {
        err.text().then( errorMessage => {
          this.setState({error: JSON.parse(errorMessage).message})
        })
        setTimeout(() => {
          this.setState({
            error: null
          })
        }, 3000);
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
        auth_token: res.auth_token
      }))
      .catch(err => {
        err.text().then( errorMessage => {
          this.setState({error: JSON.parse(errorMessage).message})
        })
        setTimeout(() => {
          this.setState({
            error: null
          })
        }, 3000);
      })
  }

  render() {
    return (
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
          ? <div>
              <Dashboard auth_token={this.state.auth_token} api_url={this.state.api_url}/>
            </div>
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
    );
  }
  
}

export default App;
