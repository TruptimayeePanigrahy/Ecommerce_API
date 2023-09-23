const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { usermodel } = require("../Models/usermodel")
const { client } = require("../Config/redis")
const {blackmodel}=require("../Models/blackmodel")
const {auth}=require("../Middlewares/auth")
const route = express.Router()


route.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body
        const user = await usermodel.findOne({ email })
        if (user) {
            return req.status(200).send({"msg":"User already present plase login"})
        }
        const haspass = bcrypt.hashSync(password, 7)
        let newuser = new usermodel({ username, email, password: haspass })
        await newuser.save()
        res.status(200).send({"msg":"Registration successfull"})
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

route.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body
        const user = await usermodel.findOne({ email })
        if (!user) {
          return  res.status(200).send({"msg":"Email not found register first"})
        }
        let hasspass = bcrypt.compareSync(password, user.password)
        if (!hasspass) {
            return res.status(400).send({"msg":"password is incorrect"})
        }

        let token = jwt.sign({ id: user._id, email: user.email }, process.env.secrete, { expiresIn: "6hr" })
        client.set('token', token, 'EX', 21600);
        res.status(200).send({"msg":"login successfull","username":user.username,"token":token,"userid":user._id})
    } catch (error) {
        res.status(400).send({ "msg": error })
    }
})

route.get("/logout",auth,async (req,res)=>{
    try {
        let token=await client.get('token');
        let newblack=new blackmodel({token})
        await newblack.save()
        res.status(200).send({"msg":"logout successfull"})
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})





module.exports={route}