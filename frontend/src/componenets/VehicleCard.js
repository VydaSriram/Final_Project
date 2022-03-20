import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import userContext from "../context/users/userContext";
import vehicleContext from "../context/vehicles/vehicleContext";

export default function Vehicles(props) {
  const { vehicle, vehupdate } = props;
  let location = useLocation();

  let context = useContext(vehicleContext);
  const { deletevehicle } = context;
  let usercontext = useContext(userContext);
  const { addToCart, removeFromCart } = usercontext;

  const handledelete = () => {
    deletevehicle(vehicle._id);
  };

  const handleaddToCart = () => {
    addToCart(vehicle);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(vehicle._id);
  };

  const handleupdate = () => {
    //console.log('upd');
    vehupdate(vehicle);
  };

  return (
    <div className="col-md-4 my-3">
      <div className="card">
        <img
          className="card-img-top"
          src={`http://localhost:5000/vehicles/profile/${vehicle.image}`}
          alt="Card image cap"
        />
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title mx-3">{vehicle.name}</h5>
            {localStorage.getItem("admin") === "1" && (
              <>
                {" "}
                <i className="fas fa-trash mx-2 " onClick={handledelete}></i>
                <i className="fas fa-pen mx-2 " onClick={handleupdate}></i>{" "}
              </>
            )}
          </div>
          <h6 className="card-text">Type : {vehicle.Type}</h6>
          <div className="row">
            <div className="col">
              <h6 className="card-text">Cost : {vehicle.cost} &nbsp; $</h6>
            </div>
            <div className="col">
              {localStorage.getItem("admin") !== "1" &&
                localStorage.getItem("token") !== "null" &&
                location.pathname !== "/viewuser/Cart" && (
                  <a
                    href="#"
                    onClick={handleaddToCart}
                    className="btn btn-primary"
                  >
                    Add to cart
                  </a>
                )}
            </div>
            <div className="col">
              {" "}
              {localStorage.getItem("admin") !== "1" &&
                localStorage.getItem("token") !== "null" &&
                location.pathname === "/viewuser/Cart" && (
                  <a href="#" className="btn btn-primary">
                    proceed to order
                  </a>
                )}
            </div>
          </div>
          <div className="col">
            {" "}
            {localStorage.getItem("admin") !== "1" &&
              localStorage.getItem("token") !== "null" &&
              location.pathname === "/viewuser/Cart" && (
                <button href="#" onClick={handleRemoveFromCart} className="btn btn-primary">
                  Remove from cart
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
