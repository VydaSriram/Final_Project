import React, { useContext, useEffect } from 'react'
import userContext from '../context/users/userContext';
import UserOrderTable from './UserOrderTable';

function Orders()
{
  let context = useContext(userContext);
  const {userorders,myorders } = context;

 useEffect(() => {
  userorders();
 }, [])
 console.log(myorders)
 let row=0;
  return (
  
   <> <div>
   <h1 style={{textAlign:"center"}}> You have ordered {myorders.length} items</h1>
 </div>
  
 <div className='container'>
      <table className="table container my-5">
         
          <thead>
              <tr>
                  <th scope="col">S.No</th>
                  <th scope="col"> Name </th>
                  <th scope="col"> Category </th>
                  <th scope="col"> cost </th>
                  <th scope="col"> Ordered on</th>
              </tr>
              
          </thead>
          <tbody>

      { myorders.map((order)=>{
                return  <UserOrderTable key={order._id} name={order.name}  category={order.category} cost={myorders[row].cost} date={order.date} row={++row}/>;
          })  }
      </tbody>
   </table>
      
  </div>
    </>
    
  )
}

export default Orders