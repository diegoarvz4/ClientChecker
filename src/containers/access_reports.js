import React from 'react';
import { Route } from 'react-router-dom';
import AccessReportEdit from './access_report_edit';

export default class AccessReports extends React.Component {
  state =  {
    error: null,
    access_reports: [],
  }

  componentDidMount() {
    this.onGetAccessReports();
  }

  componentDidUpdate() {
  
  }

  onGetAccessReports = () => {
    console.log("fetching")
    console.log(this.props)
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

  deleteAccessRep = (id) => {
    console.log("deleting")
    fetch(`${this.props.api_url}/access_reports/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.auth_token
      }
    })
    .then(res => {
      if (!res.ok) { throw res }
      return res.json()
    })
    .then(res => {
      console.log(res)
      this.setState((prevState, props) => ({
        access_reports: prevState.access_reports.filter(aR => aR.id !== id)
      }));
    })
    .catch(err => {
      console.log(err)
    })
  }

  toAccessReport = (accRep) => {
    this.props.setAccessRep(accRep)
    this.props.history.push('/access_reports/'+accRep.id)
  }

  render() {

    
    return (
      <div className="AccessReports">
        <div>Access Reports</div>
          <table style={{width: '100%'}}>
            <thead>
              <th>Entry</th>
              <th>Exit</th>
              <th>Employee</th>
              <th></th>
              <th></th>
            </thead>
              {
                this.state.access_reports.map(accRep => (
                  <tr>
                    <td>{accRep.entry}</td>
                    <td>{accRep.exit}</td>
                    <td>{accRep.employee.name}</td>
                    <td onClick={() => this.toAccessReport(accRep)}>
                      View
                    </td>
                    <td onClick={() => this.deleteAccessRep(accRep.id)}>
                      Delete
                    </td>
                  </tr>
                ))
              }
          </table>
        <span className="Error-Message">{this.state.error}</span>
      </div>
    )
  }
}