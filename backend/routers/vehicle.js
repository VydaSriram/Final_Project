const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Vehicles = require('../models/Vehicle')
const User  = require('../models/User');
const { body, validationResult } = require('express-validator');

//Router1 to get allvehicles user/admin login required
router.get('/getallvehicles',auth,async(req,res)=>{
    try{
    const vehicles = await Vehicles.find({"issold" : false})

    if(vehicles.length<=0)
      return res.status(403).json({error : "no vehicles found"})
    res.status(200).json(vehicles);
    }
    catch(error){
        res.status(500).json({error:"something has occured"})
    }
})

//Router2 to add vehicles admin login required
router.post('/addvehicle',auth,[body('name','enter a valid name').isLength({ min: 3 }),body('Type','type must be atleast 3 characters').isLength({ min: 3 }),body('cost','cost must be numeric').isNumeric()] 
,async (req,res)=>{

    let userid = req.user.id;
    const user = await User.findById(userid);
    if(user.role === 0) 
      return  res.status(401).json({error:"you are not admin"})

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {name,Type,cost} = req.body
        const vehicle = new Vehicles({
            name,Type,cost,user:req.user.id
        })
        const savedvehicle = await vehicle.save();
        res.json({savedvehicle})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"something has occured"})
    }
})

//Router3 to edit vehicle admin login required
router.put('/updatevehicle/:id',auth,async(req,res)=>{
   try {

    let userid = req.user.id;
    const user = await User.findById(userid);
    if(user.role === 0) 
      return  res.status(401).json({error:"you are not admin"})

       const {name,Type,cost} = req.body;
       const newvehicle = {};
       if(name) newvehicle.name = name;
       if(Type) newvehicle.Type = Type;
       if(cost) newvehicle.cost = cost;
      
       let vehicle = await Vehicles.findById(req.params.id)
       if(!vehicle)
          return res.status(404).json({error:"no vehicle found"})
       if(vehicle.user.toString()!==req.user.id)
          return res.status(401).json({error: "no access"})
       
       vehicle = await Vehicles.findByIdAndUpdate(req.params.id,{$set : newvehicle },{new : true})
       res.status(200).json({vehicle});
   } catch (error) {
       console.log(error)
    res.status(500).json({error:"something has occured"})
   }
})

//Router3 to delete veicles admin login required
router.delete('/deletevehicles/:id',auth,async(req,res)=>{
    try {
        let userid = req.user.id;
        const user = await User.findById(userid);
        if(user.role === 0) 
          return  res.status(401).json({error:"you are not admin"})
        
        let vehicle = await Vehicles.findById(req.params.id)
        if(!vehicle)
          return res.status(404).json({error :"no vehicles found"})
        // if(vehicle.user.toString()!==req.user.id)
        //   return res.status(401).json({error : "no access"})
       
        vehicle= await Vehicles.findByIdAndDelete(req.params.id)
          res.json({sucess : "vehicle deleted",vehicle})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "something has occured"})
    }
})

//Router4 search a vehicle admin/user login required
router.get('/searchvehicle',auth,async(req,res)=>{
    try{
     const vehicle = await Vehicles.find({"name":req.body.name});

     if(vehicle.length<=0)
        return res.status(402).json({error:"not available"});
     
     res.status(200).json({vehicle});
    }
    catch(error){
     console.log(error)
     return res.status(500).json({error:"something has occured"});
    }
    
 })

 //router5 buy a vehicle user login required
 router.post('/buyvehicle/:id',auth,async(req,res)=>{
     try{
     const userid = req.user.id;
     
     const vehicle = await Vehicles.findById(req.params.id)
     vehicle.issold = true;
     
     vehicle.user = userid;
     vehicle.save();
     res.status(200).json({vehicle});
     }
     catch(error){
         console.log(error)
         res.status(500).json({error : "something has occured"});
     }
 })

//vehicles whuch user bought
router.get('/uservehicles',auth,async(req,res)=>{
    try {
        const userid = req.user.id;
     
     const vehicles = await Vehicles.find({user:userid});
     if(vehicles.length<=0)
        res.status(402).json({error:"no vehicles bought"});
     res.status(200).json({vehicles})
    } catch (error) {
        console.log(error)
        res.status(500).json({error : "something has occured"});
    }
})

module.exports = router