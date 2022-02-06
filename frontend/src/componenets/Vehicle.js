import React, { useRef,useState } from 'react';
import VehicleCard from './VehicleCard';
import Updatevehicle from "./Updatevehicle";

export default function Vehicle(props) {

    const [vehicle, setvehicle] = useState({id:"",uname : "",utype : "",ucost:""});
    let ref=useRef(null);
    const vehupdate = (upvehicle)=>{
        setvehicle({id:upvehicle._id , uname : upvehicle.name , utype : upvehicle.Type , ucost : upvehicle.cost})
        ref.current.click();
    }
    const {vehicles} = props
  return <div className='container'>
       <div className="my-3  row">
       {vehicles.map((vehicle)=>{
        return  <VehicleCard  key={vehicle._id} vehupdate={vehupdate} vehicle={vehicle}/>
    }) }
     </div>

<Updatevehicle setvehicle={setvehicle} vehicle={vehicle} fref={ref}/>
  </div>;
}
