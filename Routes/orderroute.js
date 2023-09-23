const express = require('express');
const { OrderModel } = require('../Models/ordermodel'); 
const {auth} = require('../Middlewares/auth'); 
const orderRoutes = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     orderSchema:
 *       type: object
 *       properties:
 *         userid:
 *           type: string
 *           description: The ID of the user who placed the order.
 *         orderDate:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was placed (ISO 8601 format).
 *         totalAmount:
 *           type: number
 *           description: The total amount of the order.
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the product in the order.
 *               price:
 *                 type: number
 *                 description: The price of the product in the order.
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product in the order.
 *               description:
 *                 type: string
 *                 description: The description of the product in the order.
 *               availability:
 *                 type: boolean
 *                 description: The availability status of the product in the order.
 *               category:
 *                 type: string
 *                 description: The category of the product in the order.
 */

/**
 * @swagger
 * /order/placeOrder/:
 *  post:
 *      summary: To place a order.
 *      tags: [posts]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/orderSchema'
 *      responses:
 *          201:
 *              description: Order placed successfully..
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/orderSchema'
 *          400:
 *              description: Some server error
 */

orderRoutes.post('/placeOrder', auth, async (req, res) => {
    try {
        const { userid, totalAmount, products } = req.body;
console.log(userid)
        const order = new OrderModel({
            userid,
            totalAmount,
            products
        });

        await order.save();

        res.status(201).send({ "msg": 'Order placed successfully' });
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
});

/**
 * @swagger
 * /orderhistory/:userid:
 *   get:
 *     summary: Get order history for a user.
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve order history.
 *     responses:
 *       200:
 *         description: List of orders in the user's order history.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/orderSchema'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */

orderRoutes.get('/orderhistory/:userid', auth, async (req, res) => {
    try {
        const { userid } = req.params;

        const orders = await OrderModel.find({ userid });
        res.status(200).send({"msg": orders });
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
});

/**
 * @swagger
 * /orderDetails/:id:
 *   get:
 *     summary: Get order details by order ID.
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to retrieve order details.
 *     responses:
 *       200:
 *         description: Order details for the specified order ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/orderSchema'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */

orderRoutes.get('/orderDetails/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;

        const order = await OrderModel.findById(id);

        if (!order) {
            return res.status(404).send({ "msg": 'Order not found' });
        }

        res.status(200).send({ "msg":order });
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
});

module.exports = {orderRoutes};
