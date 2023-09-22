const jwt = require("jsonwebtoken")
const { blackmodel } = require("../Models/blackmodel")
const {client}=require("../Config/redis")
require("dotenv").config()


const auth=async (req,res,next)=>{
    try {
        let token = await client.get('token');
    // console.log(token)
    if(!token){
        return res.status(400).send({"msg":"please login first147"})
    }
    let blacktoken=await blackmodel.findOne({token})
    if(blacktoken){
        return res.status(400).send({"msg":"please login first"})
    }
    let decoded=jwt.verify(token,process.env.secrete)
    if(!decoded){
        return res.status(400).send({"msg":"something went wrong please login"})
    }
        req.body.userid = decoded.id
         req.body.email=decoded.email
     next()
    } catch (error) {
        res.send(error)
    }
}


module.exports={auth}