import React, { useContext, useEffect ,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userContext from "../context/users/userContext";
import vehicleContext from '../context/vehicles/vehicleContext';
import Vehicle from './Vehicle';

export default function Home() {
  const admin = localStorage.getItem('admin');
  let navigate = useNavigate();

  const context = useContext(vehicleContext);
  const { getallvehicles, vehicles } = context;

  let context1 = useContext(userContext);
  const { getuserdetails, user } = context1;
 
  

  useEffect(() => {
    if (admin === '1')
      navigate('/adminhome');
    else{
    getallvehicles();
   }
    
    
  }, []);

  
//console.log(name1,user.name)

  return <div className='container '>
    <div className='my-3' >
      <h1 style={{textAlign:"center" }}>welcome {localStorage.getItem('username')}</h1>

      <div className='row my-3'>
        <Vehicle  vehicles={vehicles} />
      </div>
    </div>
  </div>
}
