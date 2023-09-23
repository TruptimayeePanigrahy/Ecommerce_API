const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { usermodel } = require("../Models/usermodel")
const { client } = require("../Config/redis")
const {blackmodel}=require("../Models/blackmodel")
const {auth}=require("../Middlewares/auth")
const route = express.Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     userschema:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 * /user/register:
 *  post:
 *      summary: To add a new user to the database
 *      tags: [users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/userschema'
 *      responses:
 *          200:
 *              description: The user was successfully added.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/userschema'
 *          400:
 *              description: Some server error
 */

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



/**
 * @swagger
 * /user/login:
 *  post:
 *      summary: To check  user in the database
 *      tags: [users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/userschema'
 *      responses:
 *          200:
 *              description: The user was successfully checked.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/userschema'
 *          400:
 *              description: Some server error
 */
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

/**
 * @swagger
 * /user/logout:
 *   get:
 *     tags: [users]
 
 *     summary: Logout user from the system.
 *     responses:
 *       200:
 *         description: Logout successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the logout was successful.
 */



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