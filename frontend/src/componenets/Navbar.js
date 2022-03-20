import React, { useContext, useState } from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import vehicleContext from '../context/vehicles/vehicleContext';



export default function Navbar() {
  let location = useLocation();
 // console.log(location)
 let navigate = useNavigate();
 
 let token=localStorage.getItem("token");
 //console.log(token)
 

 const login = (e)=>{
  e.preventDefault();
  navigate('/login')
 }
 const signup = (e)=>{
   e.preventDefault();
   navigate('/signup');
 }

const [searchbox, setsearchbox] = useState("");
const context = useContext(vehicleContext);

const {setsearchname,searchname} = context;

 const handleSearch = (e)=>{
    e.preventDefault();
    setsearchname(searchbox);
    navigate('/search');
 }

const handleSearchBox = (e)=>{
  setsearchbox(e.target.value)
}

const handlelogout = ()=>{
  localStorage.setItem('token',null);
  localStorage.setItem('admin',0);
  localStorage.setItem('username',"")
  //console.log('logged out')
  navigate('/')
}

  return <div >
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">VehiclePro</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${(location.pathname==="/" || location.pathname==="/adminhome" ? "active" :"")}`} aria-current="page" to="/">Home </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${(location.pathname==="/about"?"active":"")}`} to="/about">About us</Link>
        </li>
      { (localStorage.getItem('admin')==='1') &&
       <li className="nav-item dropdown">
        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          More
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link  className="dropdown-item" to="/addvehicle">Add Vehicle</Link>
          <Link className="dropdown-item" to="/viewusers">View Users</Link>
          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" to="#">View orders </Link>
        </div>
      </li> }
      
     {token!=='null' && <li className="nav-item">
          <Link className={`nav-link ${(location.pathname==="/viewuser"?"active":"")}`} to="/viewuser">Dashboard</Link>
        </li>   }
      </ul>
      <form className="d-flex mx-4">
        <input className="form-control me-2" type="search" value={searchbox} onChange={handleSearchBox} placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" onClick={handleSearch} type="submit">Search</button>
      </form>

     {token==='null' ? <form><button className="btn btn-outline-info my-2 mx-2" onClick={login}>Login</button>
      <button className="btn btn-outline-info my-2 mx-2" onClick={signup}>Sign up</button> </form>: 
      <button className="btn btn-outline-info my-2 mx-2" onClick={handlelogout}>Log out</button> }
    </div>
  </div>
</nav>
  
  </div>;
}
