const express = require('express');
const CartModel = require("../models/cart")
const SignModel = require("../models/signUp")
const router = express.Router();


router.post('/signup', async (req, res) => {
    try {
            const {email} = req.body
        // Check if the user already exists
        const existingUser = await SignModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User with this email already exists' });
        }
        // Create a new user
        const result = await SignModel.create({
            name: req.body.name,
            password: req.body.pass,
            email: req.body.email,
            address: req.body.address
        })
        res.json({ success: true, message: "now you can login" })
        console.log(result)

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Internal server error" })
    }
});


router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;
        const check = await SignModel.findOne({ email: email })
        if (check) {
            if (check.password === password) {
                res.status(200).json({ success: true, message: `Welcome ${check.name}` });
            }
            else {
                res.json("Incorrect password");
            }
        }
        else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" })
    }

});


router.post('/orderData', async (req, res) => {
    try {
        const db = new CartModel(req.body)
        const result = await db.save()
        console.log(result)
        res.json({ success: true, message: "Order Placed" });
    } catch (error) {
        res.json({ success: false, message: "Internal server error" })
    }
});


module.exports = router;