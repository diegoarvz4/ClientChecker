import React from 'react';

export default class AccessReports extends React.Component {
  state =  {
    error: null,
    access_reports: [],
  }

  componentDidMount() {
    this.onGetAccessReports();
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
      error: null,
    }))
    .catch(err => {
      console.log(err);
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
        <h2>Access Reports</h2>
          <table style={{width: '100%'}}>
            <tr>
              <th>ENTRY</th>
              <th>EXIT</th>
              <th>EMPLOYEE</th>
              <th></th>
              <th></th>
            </tr>
            <tbody>
              {
                this.state.access_reports.map((accRep, idx) => (
                  <tr key={idx}>
                    <td>{accRep.entry}</td>
                    <td>{accRep.exit}</td>
                    <td>{accRep.employee.name}</td>
                    <td className="AccessReports-view" onClick={() => this.toAccessReport(accRep)}>
                      View
                    </td>
                    <td className="AccessReports-delete" onClick={() => this.deleteAccessRep(accRep.id)}>
                      Delete
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