import VehicleContext from "./vehicleContext";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";

const VehicleState = (props)=>{
  
  const host = 'http://localhost:5000'
const [vehicles, setvehicles] = useState([]);

const [searchname, setsearchname] = useState("")

const [searchvehicles, setsearchvehicles] = useState([]);

let navigate = useNavigate();

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
  // console.log(allvehicles)
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

  const newsearchvehicles = searchvehicles.filter((vehicle)=>{return vehicle._id!==id})
  setsearchvehicles(newsearchvehicles);
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

let snewvehicles=JSON.parse(JSON.stringify(searchvehicles))   
for(let i=0; i< searchvehicles.length;i++)
{
  const vehicle=snewvehicles[i];
  if(vehicle._id === id)
  {
    snewvehicles[i].name = name;
    snewvehicles[i].Type = Type;
    snewvehicles[i].cost = cost;
   break;
  }
}
setsearchvehicles(snewvehicles);


}

//function to add vehicle
const addvehicle = async (name,Type,cost,image)=>{
  //apicall
  const formdata = new FormData();
  formdata.append('name',name)
  formdata.append('Type',Type)
  formdata.append('cost',cost)
  formdata.append('profile',image);
  const response = await fetch(`${host}/vehicles/addvehicle`, {
    method: 'POST',  
    headers: {
      'accept' : '*/*',
      'auth-token' : localStorage.getItem('token')
    },   
    body: formdata 
  });
  const added_vehicle =await response.json(); 
  // console.log(added_vehicle);
 const vehicle = added_vehicle;
  setvehicles(vehicles.concat(vehicle));
}


//searchvehicle byname
const search = async (name) => {
    const response = await fetch(`${host}/vehicles/searchvehicle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ name }),
    });
    if (response.status !== 200) {
      alert("no Vehicle found");
      navigate('/')
    }
    const json = await response.json();
    //  console.log(json.vehicle);
    setsearchvehicles(json.vehicle);
  };

// const [vehicleByid, setvehicleByid] = useState()
//   const searchVehicleById = async (id) => {
//     const response = await fetch(`${host}/vehicles/searchvehicle/:${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token": localStorage.getItem("token"),
//       },
//     });
//     if (response.status !== 200) {
//       alert("no Vehicle found");
//       navigate('/')
//     }
//     const json = await response.json();
//     //  console.log(json.vehicle);
//     setvehicleByid(json.vehicle);
//   };



  return (
      <VehicleContext.Provider value={{vehicles,getallvehicles,deletevehicle,editvehicle,addvehicle,searchname,setsearchname,search,searchvehicles}}>
        {props.children}
      </VehicleContext.Provider>
  )

}

export default VehicleState;