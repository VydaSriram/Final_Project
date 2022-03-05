import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import vehicleContext from '../context/vehicles/vehicleContext';
import Vehicle from './Vehicle';

export default function Home() {
  const admin = localStorage.getItem('admin');
  let navigate = useNavigate();

  const context = useContext(vehicleContext);
  const { getallvehicles, vehicles } = context;

  useEffect(() => {
    if (admin === '1')
      navigate('/adminhome');
    else{
    getallvehicles();}
  }, []);



  // console.log(admin)
// console.log(vehicles)

  return <div className='container '>
    <div className='my-3' >
      <h1 style={{ left: '35%' }}>welcome user</h1>

      <div className='row my-3'>
        <Vehicle  vehicles={vehicles} />
      </div>
    </div>
  </div>
}
