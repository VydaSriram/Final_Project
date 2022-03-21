import React, { useContext, useEffect } from 'react'
import userContext from '../context/users/userContext';

function Orders()
{
  let context = useContext(userContext);
  const {userorders,myorders } = context;

 useEffect(() => {
  userorders();
 }, [])
 console.log(myorders)
  return (
    <div>
      <h1>Welcome to your orders</h1>
     
    </div>
  )
}

export default Orders