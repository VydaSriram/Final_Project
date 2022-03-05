import React, { useContext, useEffect } from 'react'
import userContext from '../context/users/userContext';


export default function Viewuser() {
    let context = useContext(userContext);
    const {getuserdetails,user} = context;

    useEffect(() => {
     getuserdetails()
      }, []);

    console.log(user)

  return (
    <div className='container my-3'>
  <div className="my-3">
  {user.name}
  </div>
    
  <div className="my-3">
    {user.email}
  </div>
    </div>
  )
}
