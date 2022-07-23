import React from 'react'
function AllOrderTable(props) {
    const {uname,mail,vehiclename,Category,row} =props
  return (
    
    
          <tr>
                    <td scope="row" >{row}</td>
                    <td>{uname}</td>
                    <td>{mail}</td>
                    <td>{vehiclename}</td>
                    <td>{Category}</td>
                </tr>
    
  )
}

export default AllOrderTable
