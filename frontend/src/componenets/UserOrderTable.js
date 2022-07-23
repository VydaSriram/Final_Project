import React from 'react'

function UserOrderTable(props) {
    const {name,category,cost,date,row} = props
  return (
      <>
    
       <tr>
        <td scope="row">{row}</td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{cost}</td>
                    <td>{date.substring(0,10)}</td>
        </tr>
    
    </>
  )
}

export default UserOrderTable
