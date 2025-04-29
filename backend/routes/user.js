const express = require('express');
const jwt = require("jsonwebtoken");
const { User } = require('../db');
const { JWT_SECRET } = require('../config');
const { signinBody } = require('../types/userCheck');

const router = express.Router();

router.post('/signin', async(req, res) => {

    const success = signinBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Error while logging in"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User signed successfully",
        token: token
    })
})
router.post('/signup', async(req,res)=>{
    // const success = signupBody.safeParse(req.body)
    // if(!success){
    //     return res.status(411).json({
    //         message: "Email already taken / Incorrect inputs"
    //     })
    // }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username:  req.body.username,
        password:  req.body.password,
        firstname:  req.body.firstname,
        lastname:  req.body.lastname,

    })

    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})


module.exports = router