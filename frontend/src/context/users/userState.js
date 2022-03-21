import UserContext from "./userContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserState = (props) => {

  const host = 'localhost:5000'
  const [users, setusers] = useState([]);

  let navigate = useNavigate();

  const [cartvehicles, setcartvehicles] = useState([]);

  const loginuser = async (logindetails) => {

    const response = await fetch(`http://${host}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: logindetails.email, password: logindetails.password })
    });
    const json = await response.json();
    console.log({ user: json.user, re: response.status });
    // console.log(json.user.role)
    if (response.status === 200) {
      //redirect
      localStorage.setItem('token', json.authToken);
      localStorage.setItem('admin', json.user.role);
      localStorage.setItem('username', json.user.name);
      navigate('/');

      //Alert('logged in succesfully','success');
    }
    else {
      alert('Invalid credentials');
    }

  }

  const signupuser = async (signupdetails) => {

    const response = await fetch(`http://${host}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: signupdetails.uname, email: signupdetails.email, password: signupdetails.password })
    });
    const json = await response.json();
    //console.log({user:json.user,re:response.status});
    // console.log(json.user.role)
    if (response.status === 200) {
      //redirect
      localStorage.setItem('token', json.authToken);
      localStorage.setItem('admin', json.user.role);
      navigate('/');
      //Alert('logged in succesfully','success');
    }
    else {
      alert('Invalid credentials');
    }

  }

  const allusers = async () => {

    const response = await fetch(`http://${host}/user/allusers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setusers(json);
    //console.log(json);

  }

  const [user, setuser] = useState({ name: "", email: "", cart: "" })

  const getuserdetails = async () => {

    const response = await fetch(`http://${host}/user/getuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setuser({ name: json.name, email: json.email, cart: json.cart })
    setcartvehicles(json.cart)

  }

  const addToCart = async (vehicledetails) => {

    const response = await fetch(`http://${host}/cart/addtocart/${vehicledetails._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ name: vehicledetails.name, Type: vehicledetails.Type, cost: vehicledetails.cost, image: vehicledetails.image, vid: vehicledetails._id })
    });
    const json = await response.json();
    if (response.status === 200) {
      const vehicle = json.vehicle;
      setcartvehicles(cartvehicles.concat(vehicle));
      alert(json.message)
    }
    else {
      alert(json)
    }
  }

  const removeFromCart = async (id) => {

    const response = await fetch(`http://${host}/cart/removefromcart/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();


    const newcartvehicles = cartvehicles.filter((vehicle) => {
      return vehicle._id !== id;
    });
    setcartvehicles(newcartvehicles);

  }

  const ordervehicle = async (id) => {

    const response = await fetch(`http://${host}/order/orderVehicle/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();

    const newcartvehicles = cartvehicles.filter((vehicle) => {
      return vehicle._id !== id;
    });
    setcartvehicles(newcartvehicles);
    alert('vehicle ordered successfully')

  }


  const [myorders, setmyorders] = useState([]);
  const userorders = async () => {

    const response = await fetch(`http://${host}/order/viewUserorders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setmyorders(json.orders);

  }

  const [allorders, setallorders] = useState([]);
  const allordersfunc = async () => {

    const response = await fetch(`http://${host}/order/viewallorders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setallorders(json.allorders);

  }


  return (
    <UserContext.Provider value={{ users, loginuser, signupuser, allusers, getuserdetails, user, addToCart, removeFromCart, cartvehicles, ordervehicle, userorders, myorders, allordersfunc, allorders }}>
      {props.children}
    </UserContext.Provider>
  )

}

export default UserState;