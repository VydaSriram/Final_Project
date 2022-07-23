import React,{ useContext, useEffect } from 'react';
import userContext from '../context/users/userContext';
import UserTable from './UserTable';

function ViewUsers() {

    let context = useContext(userContext);
    const { allusers,users } = context;

    useEffect(() => {
      allusers()
      }, []);

   //   console.log(users)
   let row=0;

  return <div className='container'>
        <table className="table container my-5">
            
            <thead>
                <tr>
                    <th scope="col">S.no</th>
                    <th scope="col"> Name </th>
                    <th scope="col"> Email </th>
                    <th scope="col"> Joined Date </th>
                </tr>
                
            </thead>
            <tbody>

        { users.map((user)=>{
                  return  <UserTable key={user._id} user={user} row={++row}/>;
            })  }
        </tbody>
     </table>
        
    </div>;
}

export default ViewUsers;
