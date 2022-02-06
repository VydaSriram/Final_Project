const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const router = express.Router()
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')

const JWT_SECRET = 'Riyazisabadboy$'

//Route1 for signingup
router.post('/signup', body('name', 'min length must be 3').isLength({ min: 3 }), body('email', 'enter valid email').isEmail(), body('password', 'min length is 5').isLength({ min: 5 })
    , async (req, res) => {
        //errors of validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            //checking for dublicate user
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ error: "user already exists" });
            }

            //hashing the password
            //   const salt = await bcrypt.genSalt(10);
            //   const secpass = await bcrypt.hash(req.body.password,salt);

            //saving userdetails to db   
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            // res.json(user)
            res.json({ user, authToken })
        }
        catch (error) {
            res.status(500).json({ error: "something has occured" })
            console.log(error)
        }
    })

//Route2 creating a login endpoint
router.post('/login', body('email', 'enter valid email').isEmail(), body('password', 'Password cant be empty').exists(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (!user)
                return res.status(400).json({ error: 'no user exists with the given email' })
            let iscorrectpass = await bcrypt.compare(req.body.password, user.password);
            if (!iscorrectpass)
                return res.status(400).json({ error: 'wrong password' })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            // res.json(user)
            res.json({ user, authToken })
        }
        catch(error) {
            console.log(error)
            res.status(500).json({ error: "something has occured" })
        }
    })

//Route3 creating a getuser endpoint
router.get('/getuser', auth, async (req, res) => {
    try {
        let userid = req.user.id;
        const user = await User.findById(userid).select("-password")
        res.status(200).json({user})
        //console.log(userid)
    } catch (error) {
        res.status(500).json({ error: "something has occured" })
    }
})

//Route4 for updating user data
router.patch('/updateuser',auth,async (req, res) => {
        //errors of validation
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        try {
            let userid = req.user.id;
            let user = await User.findById(userid)

            //checking the updates
            const updates = Object.keys(req.body)
            const allowedupdates = ['name', 'email', 'password']
            const isvalidupdate = updates.every((update) => allowedupdates.includes(update))

            if (!isvalidupdate)
                return res.status(402).json({ error: 'invalid update' })

            updates.forEach((update) => user[update] = req.body[update])
            await user.save()
            res.status(200).json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "something has occured" })
        }
    })

//router to get allusers details adminlogin required
router.get('/allusers', auth, async (req, res) => {
    try {
        let userid = req.user.id;
        let admin = await User.findById(userid);
        if(admin.role !== 1)
          return res.status(402).json({error : "contact admin"})
        const users = await User.find({role:0}).select('-password');
        res.status(200).json(users);
        //console.log(userid)
    } catch (error) {
        res.status(500).json({ error: "something has occured" })
    }
})

module.exports = router