const { Category } = require("../Models/categorymodel")
const { productmodel } = require("../Models/productmodel")
const express = require("express")
const productroute = express.Router()


productroute.post("/addproduct", async (req, res) => {
    try {
        let { title, price, description, avaibility, category } = req.body
        let data = new productmodel({ title, price, description, avaibility, category })
        await data.save()
        res.status(200).send({"msg":"product added successfully!!"})
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

productroute.get("/getproduct", async (req, res) => {
    try {
        let data = await productmodel.find().populate("category")
        //console.log( data[0].category)
        res.status(200).send({"msg":data})
    } catch (error) {
        res.status(401).send({"msg":error})
    }
})

productroute.get("/:categoryid", async (req, res) => {
    try {
        const { categoryid } = req.params;
        
        let name=await Category.findOne({_id:categoryid})
        const data = await productmodel.find({ category:{_id:categoryid,name:name.name} })
         res.status(200).json({ "msg": data });
    } catch (error) {
        
        res.status(500).json({ "msg": error.message });
    }
})

productroute.get("/products/:id", async (req, res) => {
    try {
        let { id } = req.params
        let data = await productmodel.find({ _id: id })
        res.status(200).send({"msg":data})
    } catch (error) {
        res.status(401).send({"msg":error})
    }
})










module.exports={productroute}