import React from 'react';

function UserTable(props) {
    const {user,row} = props
     
      return  <tr>
                    <th scope="row">{row}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.date).toLocaleString()}</td>
                </tr>
}

export default UserTable;
