const express = require('express');
const { cartmodel } = require('../Models/cartmodel');
const { auth } = require('../Middlewares/auth');
const cartroute = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     cartProductSchema:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the cart product.
 *         price:
 *           type: number
 *           description: The price of the cart product.
 *         quantity:
 *           type: number
 *           description: The quantity of the cart product.
 *         description:
 *           type: string
 *           description: The description of the cart product.
 *         availability:
 *           type: boolean
 *           description: The availability status of the cart product.
 *         userid:
 *           type: string
 *           description: The user ID associated with the cart product.
 *         category:
 *           type: string
 *           description: The category of the cart product.
 */

/**
 * @swagger
 * /cart/addcartproduct/:
 *  post:
 *      summary: To add a product in the cart
 *      tags: [posts]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/cartProductSchema'
 *      responses:
 *          200:
 *              description: The product was successfully in cart.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/cartProductSchema'
 *          400:
 *              description: Some server error
 */

cartroute.post('/addcartproduct', auth, async (req, res) => {
    try {
        const { title, price, quantity, description, availability,category,userid} = req.body;
       const existingCartItem = await cartmodel.findOne({ title, userid });
        console.log(existingCartItem)
        if (existingCartItem) {
           res.status(201).send({ "msg": "Product already present in the cart" });
        } else {
           
         const cartProduct = new cartmodel({
                title,
                price,
                quantity,
                description,
                availability,
                category,
                userid
            });

            await cartProduct.save();
            res.status(200).send({ "msg": "Product added to the cart successfully." });
        }
    } catch (error) {
        res.status(401).send({ "msg": error.message });
    }
});

/**
 * @swagger
 * /cart/getcartproduct:
 *   get:
 *     summary: Get cart products for a user.
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of cart products for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/cartProductSchema'
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






cartroute.get('/getcartproduct', auth, async (req, res) => {
    try {
        const userID = req.body.userid; 
        const cartProducts = await cartmodel.find({ userID });

        res.status(200).json({ "msg": cartProducts });
    } catch (error) {
        res.status(401).json({ "msg": error.message });
    }
});

/**
 * @swagger
 * /increasequantity/:productid:
 *   patch:
 *     summary: Increase the quantity of a cart product by one.
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cart product to increase quantity.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/cartProductSchema'
 *     responses:
 *       201:
 *         description: Quantity increased successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
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

cartroute.patch("/increasequantity/:productid",auth,async(req,res)=>{
    try {
        let data = await cartmodel.find({_id:req.params.productid,userid:req.body.userid});
            data[0].quantity++;
            data[0].save();
            res.status(201).send({"msg":"quantity  increases by one"})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({msg:error.message})
    }
})

/**
 * @swagger
 * /decreasequantity/:productid:
 *   patch:
 *     summary: Decrease the quantity of a cart product by one.
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cart product to decrease quantity.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/cartProductSchema'
 *     responses:
 *       201:
 *         description: Quantity increased successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
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

cartroute.patch("/decreasequantity/:productid",auth,async(req,res)=>{
    try {
        let data = await cartmodel.find({_id:req.params.productid,userid:req.body.userid});
          
           if(data[0].quantity>1){
            data[0].quantity--;
             data[0].save();
            res.status(201).send({msg:"quantity  decrease by one"})
           }
           else{
            res.status(400).send({msg:"quantity can't be less than one"})
           }
               
    } catch (error) {
        console.log(error.message)
        res.status(500).send({msg:error.message})
    }
})


/**
* @swagger
* /cart/delete/:id:
*   delete:
*     summary: To delete a product from the cart
*     tags: [posts]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/cartProductSchema'
*     responses:
*       200:
*         description: The product was successfully deleted.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/cartProductSchema'
*       404:
*         description: The specified product ID does not exist.
*       500:
*          description: Some server error
*/
cartroute.delete('/delete/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userID = req.body.userid; 
        const result = await cartmodel.deleteOne({ _id: id, userID });
        console.log(result)
        if (result.deletedCount === 0) {
            return res.status(404).send({ "msg": "Cart product not found." });
        }

        res.status(200).send({ "msg": "Cart product deleted successfully." });
    } catch (error) {
        res.status(401).send({ "msg": error.message });
    }
});



module.exports = { cartroute };
