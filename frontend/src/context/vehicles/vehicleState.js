import VehicleContext from "./vehicleContext";
import {  useState } from "react";

const VehicleState = (props)=>{
  
  const host = 'http://localhost:5000'
const [vehicles, setvehicles] = useState([]);


//function to get vehicles
const getallvehicles  = async()=>{
  const response = await fetch(`${host}/vehicles/getallvehicles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : localStorage.getItem('token')
    },    
  });
  const allvehicles= await response.json();
  setvehicles(allvehicles);
  
}

//function to delete vehicle
const deletevehicle =  async(id)=>{
  // api
  const response = await fetch(`${host}/vehicles/deletevehicles/${id}`, {
   method: 'DELETE',
   headers: {
     'Content-Type': 'application/json',
     'auth-token' : localStorage.getItem('token')
   },   
   
 });
//const json = await response.json();  
 // console.log(json)
  const newvehicles = vehicles.filter((vehicle)=>{return vehicle._id!==id})
  setvehicles(newvehicles);
 }
 
//funtion to edit vehicle
const editvehicle = async (id,name,Type,cost)=>{
  const response = await fetch(`${host}/vehicles/updatevehicle/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'auth-token' : localStorage.getItem('token')
  },   
  body: JSON.stringify({name,Type,cost}) 
});
const json = await response.json(); //console.log(json)
let newvehicles=JSON.parse(JSON.stringify(vehicles))   
for(let i=0; i< vehicles.length;i++)
{
  const vehicle=newvehicles[i];
  if(vehicle._id === id)
  {
    newvehicles[i].name = name;
    newvehicles[i].Type = Type;
    newvehicles[i].cost = cost;
   break;
  }
}
setvehicles(newvehicles);
//console.log(vehicles)
}

//function to add vehicle
const addvehicle = async (name,Type,cost)=>{
  //apicall
  const response = await fetch(`${host}/vehicles/addvehicle`, {
    method: 'POST',  
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : localStorage.getItem('token')
    },   
    body: JSON.stringify({name,Type,cost}) 
  });
  const added_vehicle =await response.json(); 
  //console.log(json);
 const vehicle = added_vehicle;
  setvehicles(vehicles.concat(vehicle));
}

  return (
      <VehicleContext.Provider value={{vehicles,getallvehicles,deletevehicle,editvehicle,addvehicle}}>
        {props.children}
      </VehicleContext.Provider>
  )

}

export default VehicleState;