import React from 'react';
import { Link } from 'react-router-dom'

export default (props) => {
  return (
    <div class="Employee">
      <h2>Employee</h2>
      <table style={{width: '100%'}}>
        <thead>
          <th>Name</th>
          <th>Username</th>
          <th></th>
        </thead>
        <tr>
          <td>{props.employee.name}</td>
          <td>{props.employee.username}</td>
          <td>
            <Link className="Employee-edit" to={`/employees/${props.employee.id}/edit`}>Edit</Link>
          </td>
          <td>
            <Link className="link" to={`/employees/${props.employee.id}/addAccessReport`}>+Add Access Report</Link>
          </td>
        </tr>
      </table>    
    </div>
  )
}
