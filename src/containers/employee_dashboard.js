import React from 'react';
import { Route, withRouter, Link } from 'react-router-dom';

import AccessReportsEmployee from '../components/access_reports_employee';

class EmployeeDashboard extends React.Component {

  state = {
    access_reports: [],
    name: '',
    username: ''
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
    }))
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="EmployeeDashboard">
        <h2>Employee Dashboard</h2>
        <nav>
          <ul>
            <li><Link to={'/'}>My Access Reports</Link></li>
          </ul>
        </nav>
        <Route 
          exact path={'/'} 
          render={(props) => (
            <AccessReportsEmployee 
              {...props} 
              access_reports={this.state.access_reports}
          />)}
        />
      </div>
    )
  }

}

export default withRouter(EmployeeDashboard);