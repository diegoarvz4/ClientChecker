import React from 'react';

export default class Dashboard extends React.Component {
  state =  {
    access_reports_view: true,
    employees_view: false,
    employee_view: false,
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
    const { 
      access_reports_view, 
      employees_view, 
      employee_view,
      access_reports,
    } = this.state

    return (
      <div className="AdminDashboard">
        <nav>
          <ul>
            <li onClick={() => {
              this.setState({
                access_reports_view: true,
                employees_view: false,
                employee_view: false,
              })
              this.onGetAccessReports();
            }}>Access Reports</li>
            <li onClick={() => {
              this.setState({
                access_reports_view: false,
                employees_view: true,
                employee_view: false,
              })
              this.onGetEmployees();
            }}>Employees</li>
          </ul>
        </nav>

        {
          access_reports_view 
          ? this.state.access_reports.length > 0
            ? <table style={{width: '100%'}}>
                <tr>
                  <th>Entry</th>
                  <th>Exit</th>
                  <th>Employee</th>
                </tr>
                {
                  this.state.access_reports.map((aR) => (
                    <tr>
                      <td> {aR.entry}</td>
                      <td> {aR.exit}</td>    
                      <td> {aR.employee.name}</td>
                    </tr>
                  ))
                }       
              </table>
            : this.state.error
            ? <span>{this.state.error}</span>
            : <span>You currently don't have Access Reports</span>
          : employees_view
            ? this.state.employees !== null
              ? Array.isArray(this.state.employees)
                ? this.state.employees.map((employee) => (
                    <div>
                      <span>Name {employee.name}</span>
                      <span>Username {employee.username}</span>    
                    </div>
                  ))
                : <span>{this.state.employees.message}</span>
              : <span>No employees</span>
            : employee_view 
              ? <div>Employee View</div>
              : null
        }
        <span className="Error-Message">{this.state.error}</span>
      </div>
    )
  }
}