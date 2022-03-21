import './App.css';
import Navbar from './componenets/Navbar';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './componenets/Home';
import About from './componenets/About';
import VehicleState from './context/vehicles/vehicleState';
import Login from './componenets/Login';
import UserState from './context/users/userState';
import Signup from './componenets/Signup';
import Adminhome from './componenets/Adminhome';
import AddVehicle from './componenets/modals/AddVehicle';
import ViewUsers from './componenets/ViewUsers';
import Viewuser from './componenets/Viewuser';
import Search from './componenets/Search';
import Cart from './componenets/Cart';
import Orders from './componenets/Orders';
import AllOrders from './componenets/AllOrders';



function App() {
  return (
    <div className="App">
      
     
      <BrowserRouter>
      <UserState>
      <VehicleState>
       <Navbar />
       <Routes>
         <Route exact path="/" element={ <Home /> } ></Route>
         <Route exact path="/adminhome" element={ <Adminhome /> } ></Route>
         <Route exact path="/about" element={ <About /> } ></Route>
         <Route exact path="/login" element={ <Login /> } ></Route>
         <Route exact path="/signup" element={ <Signup /> } ></Route>
         <Route exact path="/addvehicle" element={ <AddVehicle /> } ></Route>
         <Route exact path="/viewusers" element={ <ViewUsers /> } ></Route>
         <Route exact path="/viewuser" element={ <Viewuser/> }></Route>
         <Route exact path="/viewuser/Cart" element={ <Cart/> } ></Route>
         <Route exact path="/viewuser/Orders" element={ <Orders/>} ></Route>
         <Route exact path="/search" element={ <Search/> }></Route>
         <Route exact path="/allorders" element = { <AllOrders></AllOrders> }></Route>
       </Routes>
       </VehicleState>
       </UserState>
     </BrowserRouter>
     
     
     
  
    </div>
  );
}

export default App;
