import React from 'react';
import { Link } from 'react-router-dom'

export default (props) => {

  return (
    <div class="AccessReport">
      <h2>User Access Report</h2>
      <table style={{width: '100%'}}>
        <thead>
          <th>Entry</th>
          <th>Exit</th>
          <th>Employee</th>
          <th></th>
        </thead>
        <tr>
          <td>{props.accRep.entry}</td>
          <td>{props.accRep.exit}</td>
          <td>{props.accRep.employee.name}</td>
          <td>
            <Link className="AccessReport-edit" to={`/access_reports/${props.accRep.id}/edit`}>Edit</Link>
          </td>
        </tr>
      </table>    
    </div>
  )
}

