import React from 'react';

export default class Employees extends React.Component {
  state =  {
    error: null,
    access_reports: [],
    employees: null,
  }

  componentDidMount() {
    this.onGetAccessReports();
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  onGetAccessReports = () => {
    fetch(`${this.props.api_url}/access_reports`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.auth_token
      }
    })
    .then(res => {
      if (!res.ok) { throw res }
      return res.json()
    })
    .then(res => this.setState({
      access_reports: res,
      access_reports_view: true,
      employees_view: false,
      employee_view: false,
      error: null,
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

  onGetEmployees = () => {
    fetch(`${this.props.api_url}/employees`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.auth_token
      }
    })
    .then(res => {
      if (!res.ok) { throw res }
      return res.json()
    })
    .then(res => this.setState({
      employees: res,
      access_reports_view: false,
      employees_view: true,
      employee_view: false,
      error: null,
    }))
    .catch(err => {
      console.log("Not authorized")
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
      <div className="Employees">


        <span className="Error-Message">{this.state.error}</span>
      </div>
    )
  }
}