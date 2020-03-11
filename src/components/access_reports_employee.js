import React from 'react';

export default (props) => {
  console.log(props)
  return (
    <div className="AccessReports">
      <h2>My Access Reports</h2>
      {
        props.access_reports.length > 0
        ? <table style={{width: '100%'}}>
            <tr>
              <th>Entry</th>
              <th>Exit</th>
              <th></th>
            </tr>  
            { 
              props.access_reports.map((accRep, idx) => (
                  <tr key={idx}>
                    <td>{accRep.entry}</td>
                    <td>{accRep.exit}</td>
                  </tr>
                ))
              }
          </table>
        : <div>You don't have Access Reports. Only and administrator can add Access Reports</div>         
      }    
    </div>
  )
}

