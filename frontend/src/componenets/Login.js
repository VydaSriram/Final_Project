import React, { useEffect } from 'react';
import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';


import UserContext from '../context/users/userContext';

export default function Login() {
    let navigate=useNavigate()
    let context = useContext(UserContext)
    const { loginuser } = context;
    const [logindetails, setlogindetails] = useState({email : "",password : ""});
    const handlechange = (e)=>{
     setlogindetails({...logindetails,[e.target.name]:e.target.value})
    }
    useEffect(() => {
        if(localStorage.getItem('token')!=='null')
          navigate('/')
      }, []);
  
    const handlesubmit = (e)=>{
        e.preventDefault();
      //console.log(logindetails)
      loginuser(logindetails);
    }

    return <>
        <div className="container my-5">
            <form onSubmit={handlesubmit}>

                <h1 className='my-3' >Log in</h1>

                <div className="form-group my-2">
                    <label name="email">Email</label>
                    <input type="email" id='email' name="email" value={logindetails.email} className="form-control" onChange={handlechange} placeholder="Enter email"  required/>
                </div>

                <div className="form-group my-2">
                    <label name='password' >Password</label>
                    <input type="password" id='password' name='password' value={logindetails.password} onChange={handlechange} className="form-control" placeholder="Enter password" minLength={5} required/>
                </div>

                <div className="form-group my-2">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block my-2">Sign in</button>
                <p className="forgot-password text-right my-2">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        </div>
    </>
}
