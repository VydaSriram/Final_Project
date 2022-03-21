import React, { useContext, useEffect } from "react";
import userContext from "../context/users/userContext";
import { useNavigate } from 'react-router-dom';

export default function Viewuser() {
  let context = useContext(userContext);
  const { getuserdetails, user } = context;
  
  useEffect(() => {
    getuserdetails();
  }, []);

  //console.log(user.cart);
  const mystyled = {
    color: "SlateBlue",
    textAlign: "center",
  };
  const mystlet = {
    border: "solid",
    borderColor: "black",
    marginRight: "15%",
    width: "70%",
    marginLeft: "15%",
    marginTop: "2.5%",
  };
  
  let navigate = useNavigate();
  const cart=()=>{
    navigate('/viewuser/Cart');
  }
  const Orders=()=>{
    navigate('/viewuser/Orders');


  }


  return (
    <div className="container my-4">
      <h1 style={mystyled}>DASHBOARD</h1>
      <table className="table table-striped my-6" style={mystlet}>
        <tbody>
          <tr style={{ border: "solid", borderColor: "black", height: "10%" }}>
            <td>USER-NAME</td>
            <td>{user.name}</td>
          </tr>
          <tr style={{ border: "solid", borderColor: "black" }}>
            <td>EMAIL</td>
            <td>{user.email}</td>
          </tr>
        { (localStorage.getItem('admin')==='0')  && <tr style={{ border: "solid", borderColor: "black" }}>
          <td>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ borderRadius: "5%" }}
              onClick={cart}
              
            >
              CHECK YOUR CART
            </button>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ borderRadius: "5%" }}
              onClick={Orders}
            >
              CHECK YOUR ORDERS
            </button>
          </td>
        </tr>}
        </tbody>
      </table>
    </div>
  );
}
