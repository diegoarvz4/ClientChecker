import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import AccessReports  from './access_reports';
import AccessReport from '../components/access_report';
import AccessReportEdit from '../containers/access_report_edit';
import Employees from './employees';
import Employee from '../components/employee';

class AdminDashboard extends React.Component {
  state =  {
    error: null,
    access_reports: [],
    employees: null,
    accRep: {}
  }

  componentDidMount() {
    //this.onGetAccessReports();
  }

  componentDidUpdate() {
    //console.log(this.state)
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
      console.log(err);
    })
  }

  setAccessRep = (accRep) => {
  
    this.setState({
      accRep: {...accRep}
    })
  
  }

  editAccessRep = (id, accRep) => {
    fetch(`${this.props.api_url}/access_reports/${id}`, {
      method: 'PUT',
      body: JSON.stringify(accRep),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.auth_token
      }
    })
    .then(res => {
      if (!res.ok) { throw res }
      return res.json()
    })
    .then(res => {this.props.history.push(`/`)})
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="AdminDashboard">
        <h2>ADMIN Dashboard</h2>
        <Route 
          exact path={'/'} 
          render={(props) => (
            <AccessReports 
              {...props} 
              api_url={this.props.api_url} 
              auth_token={this.props.auth_token}
              toAccesReport={this.toAccessReport}
              setAccessRep={this.setAccessRep}
              deleteAccessRep={this.deleteAccessRep}
          />)}
        />
        <Route 
          exact path={'/access_reports/:id'} 
          render={(props) => (
            <AccessReport 
              {...props} 
              accRep={this.state.accRep}
              
            />
          )}
        />
        <Route 
          exact path={'/access_reports/:id/edit'} 
          render={(props) => (
            <AccessReportEdit 
              {...props} 
              accRep={this.state.accRep} 
              editAccessRep={this.editAccessRep}
            />
          )}
        />
        <Route 
          exact path={'/employees'} 
          render={(props) => <Employees {...props} />}
        />
        <Route 
          exact path={'/employee/:id'} 
          render={(props) => <Employee {...props} />}
        />

        <span className="Error-Message">{this.state.error}</span>
      </div>
    )
  }
}

export default withRouter(AdminDashboard)