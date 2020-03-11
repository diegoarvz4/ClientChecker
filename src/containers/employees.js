import React from 'react';

export default class Employees extends React.Component {
  state =  {
    error: null,
    employees: [],
  }

  componentDidMount() {
    this.onGetEmployees();
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
      error: null,
    }))
    .catch(err => {
      console.log(err)
    })
  }

  

  toEmployee = (employee) => {
    console.log(employee)
    this.props.setEmployee(employee)
    this.props.history.push('/employees/'+employee.id)
  }


  render() {


    return (
      <div className="Employees">
        <h2>Employees</h2>
          <table style={{width: '100%'}}>
            <thead>
              <th>Name</th>
              <th>Username</th>
              <th></th>
              <th></th>
            </thead>
            <tbody>
              {
                this.state.employees.map(employee => (
                  <tr>
                    <td>{employee.name}</td>
                    <td>{employee.username}</td>
                    <td className="AccessReports-view" onClick={() => this.toEmployee(employee)}>
                      View  
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        <span className="Error-Message">{this.state.error}</span>
      </div>
    )
  }
}