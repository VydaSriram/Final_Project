import React, { useContext, useState } from 'react';
import UserContext from '../context/users/userContext';

export default function Signup(){

  let context = useContext(UserContext);
  const { signupuser } = context;

  const [signupdetails, setsignupdetails] = useState({ uname:"" , email : "", password : "", cpassword :""});

  const handlechange = (e)=>{
    setsignupdetails({...signupdetails,[e.target.name]:e.target.value})
    
   }
 
   const handlesubmit = (e)=>{
       e.preventDefault();
     //console.log(signupdetails)
     if(signupdetails.password !== signupdetails.cpassword){
       
       alert('passwords should match')
       return false;
     }
     signupuser(signupdetails)
    
   }

  return <>
   <div className="container my-5">
            <form onSubmit={handlesubmit}>

                <h1 className='my-3' >Sign up</h1>
                
                <div className="form-group my-2">
                    <label name="uname">Name</label>
                    <input type="text" id='uname' name="uname" value={signupdetails.uname} className="form-control" onChange={handlechange} placeholder="Enter name" minLength={5} required/>
                </div>

                <div className="form-group my-2">
                    <label name="email">Email</label>
                    <input type="email" id='email' name="email" value={signupdetails.email} className="form-control" onChange={handlechange} placeholder="Enter email"  required/>
                </div>

                <div className="form-group my-2">
                    <label name='password' >Password</label>
                    <input type="password" id='password' name='password' value={signupdetails.password} onChange={handlechange} className="form-control" placeholder="Enter password" minLength={5} required/>
                </div>

                <div className="form-group my-2">
                    <label name='cpassword' >Confirm Password</label>
                    <input type="password" id='cpassword' name='cpassword' value={signupdetails.cpassword} onChange={handlechange} className="form-control" placeholder="confirm password" minLength={5} required/>
                </div>
      
                <p id='cpass' className='small my-2'></p>

                <button type="submit" className="btn btn-dark btn-lg btn-block my-2">Sign up</button>
                
            </form>
        </div>
    </>
}
