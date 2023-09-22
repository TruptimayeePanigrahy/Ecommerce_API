const express = require("express")
const {Category}=require("../Models/categorymodel")
const categoryroute = express.Router()

categoryroute.post("/addcategory", async(req, res) => {
    try {
        let { name } = req.body
        let data = new Category(req.body)
        await data.save()
        res.status(200).send({"msg":"category added"})
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

categoryroute.get("/getcategory", async (req, res) => {
    try {
        let data = await Category.find()
        res.status(200).send({"msg":data})
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})



module.exports={categoryroute}