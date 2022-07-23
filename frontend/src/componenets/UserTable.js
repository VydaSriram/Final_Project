import React from 'react';

function UserTable(props) {
    const {user,row} = props
     
      return  <tr>
                    <td scope="row">{row}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.date).toLocaleString()}</td>
                </tr>
}

export default UserTable;
