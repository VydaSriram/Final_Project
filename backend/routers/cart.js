const express = require('express')
const User = require('../models/User')
const router = express.Router()
const auth = require('../middleware/auth')

router.post('/addtocart',auth,async(req,res)=>{
    
    try {
        
        let userid = req.user.id;
        let user = await User.findById(userid)

        user.cart.push(req.body);
        await user.save();
        res.status(200).json(user);    

    } catch (error) {
        console.log(error);
        res.json({error:"something occured"})
    }
})

router.post('/removefromcart/:pid',auth,async(req,res)=>{
    
    try {
        
        let userid = req.user.id;
        let user = await User.findById(userid)
        let cart = user.cart
        let cartveh = cart.filter(element =>{
            return (element._id !== req.params.pid) 
        })
       res.status(200).json(cartveh);    

    } catch (error) {
        console.log(error);
        res.status(400).json({error:"something occured"})
    }
})



module.exports = router 