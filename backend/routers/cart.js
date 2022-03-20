const express = require("express");
const User = require("../models/User");
const router = express.Router();
const auth = require("../middleware/auth");

//to add vehicle to cart
router.post("/addtocart/:vehid", auth, async (req, res) => {
  try {
    let userid = req.user.id;
    let user = await User.findById(userid);
    let vehid = req.params.vehid;
    for (var i = 0; i < user.cart.length; i++) {
      if (user.cart[i].vid.equals(vehid))
        return res.status(201).json("vehicle  already in cart");
    }
    user.cart.push(req.body);
    await user.save();
    res.status(200).json({message:"vehicle added to cart",vehicle:req.body});
  } catch (error) {
    console.log(error);
    res.json({ error: "something occured" });
  }
});

//to remove vehicle from cart
router.post("/removefromcart/:pid", auth, async (req, res) => {
  try {
    let userid = req.user.id;
    let user = await User.findById(userid);
    let cart = user.cart;
    console.log(req.params.pid);
    let cartveh = cart.filter((element) => {
      return !(element._id.equals(req.params.pid));
    });
    user.cart = cartveh;
    console.log(cartveh);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "something occured" });
  }
});

// to view cart
router.get("/viewCart", auth, async (req, res) => {
  try {
    let userid = req.user.id;
    let user = await User.findById(userid);
    let cart = user.cart;
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "something occured" });
  }
});

module.exports = router;
