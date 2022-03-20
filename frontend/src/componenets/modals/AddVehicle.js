import React, { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import vehicleContext from '../../context/vehicles/vehicleContext';

export default function AddVehicle() {
    let context = useContext(vehicleContext);
    const { addvehicle } = context;
    let addref = useRef(null);
    let closeref = useRef(null);
    useEffect(() => {
        addref.current.click();
    }, []);

    let navigate = useNavigate();

    const [vehicle, setvehicle] = useState({ uname: "", utype: "", ucost: "" ,image:null});
    const handlechange = (e) => {
        setvehicle({ ...vehicle, [e.target.name]: e.target.value })
        //console.log(vehicle)
    }
    const handlefiles = (e) => {
       setvehicle({...vehicle, [e.target.name] : e.target.files[0]});
    }

    const handlesubmit = () => {
        //console.log(vehicle)
        addvehicle(vehicle.uname, vehicle.utype, vehicle.ucost,vehicle.image);
        closeref.current.click();
        navigate('/adminhome');
    }

    const hclose = () => {
        navigate('/adminhome');
    }

    return <div className='my-3'>
        <button ref={addref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
            Launch demo modal
        </button>

        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Add Vehicle</h5>
                        <button type="button" onClick={hclose} className="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form >

                            <div className="form-group my-2">
                                <label name="uname">Name</label>
                                <input type="text" id='uname' name="uname" value={vehicle.uname} className="form-control" onChange={handlechange} required />
                            </div>

                            <div className="form-group my-2">
                                <label name='utype' >Type</label>
                                <input type="text" id='utype' name='utype' value={vehicle.utype} onChange={handlechange} className="form-control" minLength={3} required />
                            </div>
                            <div className="form-group my-2">
                                <label name='ucost' >Cost</label>
                                <input type="number" id='ucost' name='ucost' value={vehicle.ucost} onChange={handlechange} className="form-control" minLength={2} required />
                            </div>
                            <div className="form-group my-2">
                                <label name='vehimage' >Image</label>
                                <input type="file" id='image' onChange={handlefiles} name='image' className="form-control" required />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={hclose} ref={closeref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" onClick={handlesubmit} className="btn btn-primary"> Add </button>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}
