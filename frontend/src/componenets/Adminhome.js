import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VehicleContext from '../context/vehicles/vehicleContext';
import Vehicle from './Vehicle';


export default function Adminhome() {

  let context = useContext(VehicleContext);
  const { getallvehicles,vehicles } = context;
  let navigate  = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('admin')!== '1')
       navigate('/login')
    getallvehicles();
  }, []);
  

  return <div className='container my-3'>
      <h1 style={{textAlign:"center"}} className='my-3'> welcome admin</h1>
   <div className='row my-3'>
   <Vehicle key={vehicles.length} vehicles={vehicles} />
   
    </div>
  </div>;
}
