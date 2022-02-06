import React, { useContext, useRef } from 'react';
import vehicleContext from '../context/vehicles/vehicleContext';

function Updatevehicle(props) {
    let context  = useContext(vehicleContext);
    const { editvehicle } = context;
    const { vehicle, fref,setvehicle } = props;
   // console.log(vehicle)
   const closeref  = useRef(null); 

    const handlechange = (e)=>{
   setvehicle({...vehicle,[e.target.name]:e.target.value})
  // console.log(vehicle)
    }

   const handlesubmit = ()=>{
        console.log(vehicle)
        editvehicle(vehicle.id,vehicle.uname,vehicle.utype,vehicle.ucost);
        closeref.current.click();
    }

    return <div>

        <button ref={fref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
            Launch demo modal
        </button>

        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Update vehicle</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form >

                            <div className="form-group my-2">
                                <label name="uname">Name</label>
                                <input type="text" id='uname' name="uname" value={vehicle.uname} className="form-control" onChange={handlechange}  required />
                            </div>

                            <div className="form-group my-2">
                                <label name='utype' >Type</label>
                                <input type="text" id='utype' name='utype' value={vehicle.utype} onChange={handlechange} className="form-control"  minLength={3} required />
                            </div>
                            <div className="form-group my-2">
                                <label name='ucost' >Cost</label>
                                <input type="number" id='ucost' name='ucost' value={vehicle.ucost} onChange={handlechange} className="form-control"  minLength={2} required />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" ref={closeref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" onClick={handlesubmit} className="btn btn-primary"> Update </button>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default Updatevehicle;
