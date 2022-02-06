import React,{ useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../context/users/userContext';


export default function Home() {
  const admin = localStorage.getItem('admin');
  let navigate = useNavigate();
  useEffect(() => {
    if(admin==='1')
       navigate('/adminhome');
  },[]);
  

 

  const context = useContext(UserContext);
 
  // console.log(admin)

  return <div className='container '>
     <div className='my-3' >
       <h1 style={{left:'35%'}}>welcome user</h1>
        </div>
  </div>;
}
