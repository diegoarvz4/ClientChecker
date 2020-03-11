import React from 'react';
import { Route, withRouter, Link } from 'react-router-dom';
import AccessReports  from './access_reports';
import AccessReport from '../components/access_report';
import AccessReportEdit from '../containers/access_report_edit';
import AccessReportCreate from '../containers/access_report_create';
import Employees from './employees';
import Employee from '../components/employee';
import EmployeeEdit from '../containers/employee_edit';

class AdminDashboard extends React.Component {
  state =  {
    error: null,
    access_reports: [],
    employees: null,
    accRep: {},
    employee: {}
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

  setEmployee = (employee) => {
    console.log(employee, "from set employee")
    this.setState({
      employee: {...employee}
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

  editEmployee = (id, employee) => {
    fetch(`${this.props.api_url}/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(employee),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.auth_token
      }
    })
    .then(res => {
      if (!res.ok) { throw res }
      return res.json()
    })
    .then(res => {this.props.history.push(`/employees`)})
    .catch(err => {
      console.log(err)
    })
  }

  addAccessReport = (accRep) => {
    fetch(`${this.props.api_url}/access_reports/`, {
      method: 'POST',
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
        <h2>Admin Dashboard</h2>
        <nav>
          <ul>
            <li><Link to={'/'}>Access Reports</Link></li>
            <li><Link to={'/employees'}>Employees</Link></li>
          </ul>
        </nav>
        <Route 
          exact path={'/'} 
          render={(props) => (
            <AccessReports 
              {...props} 
              api_url={this.props.api_url} 
              auth_token={this.props.auth_token}
              setAccessRep={this.setAccessRep}
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
          render={(props) => (
            <Employees 
              {...props}
              api_url={this.props.api_url} 
              auth_token={this.props.auth_token}
              setEmployee={this.setEmployee}
            />
          )}
        />
        <Route 
          exact path={'/employees/:id'} 
          render={(props) => (
            <Employee 
              {...props}
              employee={this.state.employee} 
            />
          )}
        />
        <Route 
          exact path={'/employees/:id/edit'} 
          render={(props) => (
            <EmployeeEdit 
              {...props}
              employee={this.state.employee}
              editEmployee={this.editEmployee}
            />
          )}
        />
        <Route 
          exact path={'/employees/:id/addAccessReport'} 
          render={(props) => (
            <AccessReportCreate 
              {...props}
              employee={this.state.employee}
              addAccessReport={this.addAccessReport}
            />
          )}
        />

        <span className="Error-Message">{this.state.error}</span>
      </div>
    )
  }
}

export default withRouter(AdminDashboard)