const express = require("express")
const {Category}=require("../Models/categorymodel")
const categoryroute = express.Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     categorySchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 */

/**
 * @swagger
 * /category/addcategory/:
 *  post:
 *      summary: To add a new category  to the database
 *      tags: [posts]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/categorySchema'
 *      responses:
 *          200:
 *              description: The category was successfully added.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/categorySchema'
 *          400:
 *              description: Some server error
 */

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

/**
 * @swagger
 * /category/getcategory:
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
 *                 $ref: '#/components/schemas/categorySchema'
 */

categoryroute.get("/getcategory", async (req, res) => {
    try {
        let data = await Category.find()
        res.status(200).send({"msg":data})
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})



module.exports={categoryroute}