const { Category } = require("../Models/categorymodel")
const { productmodel } = require("../Models/productmodel")
const express = require("express")
const productroute = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     productschema:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         price:
 *           type: number
 *         description:
 *           type: string
 *         availability:
 *           type: boolean
 *         category:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 */


 /**
 * @swagger
 * /product/addproduct/:
 *  post:
 *      summary: To add a new product  to the database
 *      tags: [posts]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/productschema'
 *      responses:
 *          200:
 *              description: The product was successfully added.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/productschema'
 *          400:
 *              description: Some server error
 */


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

/**
 * @swagger
 * /product/getproduct:
 *   get:
 *     summary: This route is get all the products from database.
 *     responses:
 *       200:
 *         description: The list of all the product.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/productschema'
 */

productroute.get("/getproduct", async (req, res) => {
    try {
        let data = await productmodel.find().populate("category")
        //console.log( data[0].category)
        res.status(200).send({"msg":data})
    } catch (error) {
        res.status(401).send({"msg":error})
    }
})

/**
 * @swagger
 * /product/:categoryid:
 *   get:
 *     summary: Get products by category ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoryid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category
 *     responses:
 *       200:
 *         description: List of products in the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/productschema'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */


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

/**
 * @swagger
 * /product/products/:id:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/productschema'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */


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