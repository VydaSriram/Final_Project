import UserContext from "./userContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserState = (props)=>{

  const host = 'localhost:5000'
 const [users, setusers] = useState([]);
//  const [user,setuser] = useState();
 let navigate = useNavigate(); 
 
 

 const loginuser = async(logindetails)=>{
   
    const response = await fetch(`http://${host}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },   
        body: JSON.stringify({email : logindetails.email,password : logindetails.password}) 
      });
      const json= await response.json();
    //console.log({user:json.user,re:response.status});
   // console.log(json.user.role)
    if(response.status===200)
    {
      //redirect
      localStorage.setItem('token',json.authToken);
      localStorage.setItem('admin',json.user.role);
      navigate('/');
      //Alert('logged in succesfully','success');
     }
    else
    {
     alert('Invalid credentials');
    }

 }

 const signupuser = async(signupdetails)=>{
   
    const response = await fetch(`http://${host}/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },   
        body: JSON.stringify({name : signupdetails.uname,email : signupdetails.email,password : signupdetails.password}) 
      });
      const json= await response.json();
    //console.log({user:json.user,re:response.status});
   // console.log(json.user.role)
    if(response.status===200)
    {
      //redirect
      localStorage.setItem('token',json.authToken);
      localStorage.setItem('admin',json.user.role);
      navigate('/');
      //Alert('logged in succesfully','success');
     }
    else
    {
     alert('Invalid credentials');
    }

 }

 const allusers = async()=>{
  
  const response = await fetch(`http://${host}/user/allusers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token' : localStorage.getItem('token')
        },   
      });
      const json = await response.json();
      setusers(json);
      //console.log(json);

 }

const [user, setuser] = useState({name:"",email:""})

 const getuserdetails = async()=>{
  
  const response = await fetch(`http://${host}/user/getuser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token' : localStorage.getItem('token')
        },   
      });
      const json = await response.json();
      setuser({name:json.name,email:json.email})
      // setuser(json)
      // console.log(user)

 }



  return (
      <UserContext.Provider value={{users,loginuser,signupuser,allusers,getuserdetails,user}}>
        {props.children}
      </UserContext.Provider>
  )

}

export default UserState;