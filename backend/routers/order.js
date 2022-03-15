const express = require('express')
const User = require('../models/User')
const router = express.Router()
const auth = require('../middleware/auth')
const Order = require('../models/Order')

// to order a vehicle

router.post('/orderVehicle/:vid',auth,async(req,res)=>{
    
    try {
        
        let user = await User.findById(req.user.id)
        let cart = user.cart;
        let vid = req.params.vid
        let vehicle  = cart.filter((vehicle)=>{
            return vehicle._id.equals(vid);
        })
        let veh = vehicle[0];
       let order = await Order.create({
            userid: req.user.id,
            name: veh.Name,
            category : veh.Category,
            cost : veh.Cost,
            image : veh.image
        })
        
        let cartveh = cart.filter(element =>{ 
            return (!element._id.equals(vid))
        })
       user.cart=cartveh
       await user.save();

        res.status(200).json({order:order,user:user});
      

    } catch (error) {
        console.log(error);
        res.json({error:"something occured"})
    }
})

router.get('/viewallorders',auth,async(req,res)=>{
    try {    
        let orders = await  Order.find({});
        let allorders = []
        for(var i=0;i<orders.length;i++)
        {
          let order = {username:"",useremail:"",vehicleName:"",vehicleCategory:"",vehicleCost:"",img:""}
          let user = await User.findById(orders[i].userid);
          order.username = user.name;
          order.useremail = user.email;
          order.vehicleName = orders[i].name;
          order.vehicleCategory = orders[i].category;
          order.vehicleCost = orders[i].cost;
          order.img = orders[i].image;
          allorders.push(order);
        }
       
        res.status(200).json({allorders});

    } catch (error) {
        console.log(error)
        res.status(500).json({error:"some error occurred"})
    }
})

router.get('/viewUserorders',auth,async(req,res)=>{
    try { 
        
        let orders = await  Order.find({userid:req.user.id});
        res.status(200).json({orders});

    } catch (error) {
        console.log(error)
        res.status(500).json({error:"some error occurred"})
    }
})

module.exports = router