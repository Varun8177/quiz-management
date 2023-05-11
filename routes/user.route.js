const express = require("express")
const UserModel = require("../models/user.model")
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

userRouter.post("/register", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            res.status(400).send({
                message: "User already registered, please login"
            })
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                const newUser = new UserModel({ email, password: hash })
                await newUser.save()
                res.status(200).send({
                    message: "signup successfull!!"
                })
            })
        }
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ email }, "zoro")
                    res.status(200).send({
                        message: "Login Successfull!!",
                        user,
                        token
                    })
                } else {
                    res.status(400).send({
                        message: "Login Failed, Wrong Credentials!!"
                    })
                }
            })
        } else {
            res.status(400).send({
                message: "user not found, please signup"
            })
        }
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})



module.exports = userRouter