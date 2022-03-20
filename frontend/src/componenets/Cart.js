import React, { useContext,useEffect, useState} from "react";
import userContext from "../context/users/userContext";
import VehicleCard from './VehicleCard';
function Cart() {
  let context = useContext(userContext);
  const { getuserdetails, user,cartvehicles } = context;
  //console.log("hello")

  useEffect(() => {
    getuserdetails();
  }, []);

  return (
    <>
    <div className="container my-3">

      <h1>Cart contains {user.cart.length} items</h1>
      <div className="my-3  row">
       {cartvehicles.length !== 0 ?  cartvehicles.map((vehicle)=>{   
        return  <VehicleCard  key={vehicle._id}  vehicle={vehicle}/>
    }) : <div> no vehicles in the cart  </div>}
     </div>
    </div>
 
    </>
  )
}

export default Cart
