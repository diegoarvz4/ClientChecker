import React from 'react';
import { Link } from 'react-router-dom'

export default (props) => {

  console.log("access report props", props)

  return (
    <div>
      <table style={{width: '100%'}}>
        <thead>
          <th>Entry</th>
          <th>Exit</th>
          <th>Employee</th>
          <th></th>
          <th></th>
        </thead>
        <tr>
          <td>{props.accRep.entry}</td>
          <td>{props.accRep.exit}</td>
          <td>{props.accRep.employee.name}</td>
          <td>
            <Link to={`/access_reports/${props.accRep.id}/edit`}>Edit</Link>
          </td>
          <td onClick={() => {

          }}>Delete</td>
        </tr>
      </table>    
    </div>
  )
}

