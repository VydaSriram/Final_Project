import React, { useContext } from "react";
import vehicleContext from "../context/vehicles/vehicleContext";


export default function Vehicles(props) {

  const { vehicle, vehupdate } = props;
  
  let context = useContext(vehicleContext);
  const { deletevehicle } = context;

  const handledelete = () => {
    deletevehicle(vehicle._id);
  }



  const handleupdate = () => {
    //console.log('upd');
    vehupdate(vehicle)

  }


  return <div className='col-md-4 my-3'>

    <div className="card" >
      <img className="card-img-top" src="..." alt="Card image cap" />
      <div className="card-body">
        <div className="d-flex align-items-center">
          <h5 className="card-title mx-3">{vehicle.name}</h5>
          {localStorage.getItem('admin') === '1' && <> <i className="fas fa-trash mx-2 " onClick={handledelete}></i>
            <i className="fas fa-pen mx-2 " onClick={handleupdate}></i> </>}
        </div>
        <h6 className="card-text">Type : {vehicle.Type}</h6>
        <div className="row">
          <div className="col"> <h6 className="card-text">Cost : {vehicle.cost} &nbsp; $</h6></div>
         <div className="col"> {(localStorage.getItem('admin') !== '1' && localStorage.getItem('token')!=='null') && <a href="#" className="btn btn-primary">Add to cart</a>}</div>
         </div>
      </div>
    </div>


  </div>;

}
