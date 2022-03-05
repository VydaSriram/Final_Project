import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import vehicleContext from "../context/vehicles/vehicleContext";
import VehicleCard from "./VehicleCard";
import Updatevehicle from "./Updatevehicle";

export default function Search() {
  const context = useContext(vehicleContext);
 
  const { searchname,search,searchvehicles } = context;

  const [vehicle, setvehicle] = useState({id:"",uname : "",utype : "",ucost:""});
    let ref=useRef(null);
    const vehupdate = (upvehicle)=>{
        setvehicle({id:upvehicle._id , uname : upvehicle.name , utype : upvehicle.Type , ucost : upvehicle.cost})
        ref.current.click();
    }
  
  useEffect(() => {
    search(searchname);
  }, [searchname]);

  return (
    <div className="container my-3">
    
      {searchvehicles && <div className="my-5  row">
        {searchvehicles.map((vehicle) => {
          return <VehicleCard key={vehicle._id} vehupdate={vehupdate} vehicle={vehicle} />;
        })}
      </div>}

      <Updatevehicle setvehicle={setvehicle} vehicle={vehicle} fref={ref}/>
    </div>
  );
}
