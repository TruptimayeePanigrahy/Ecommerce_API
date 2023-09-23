const express = require('express');
const { OrderModel } = require('../Models/ordermodel'); 
const {auth} = require('../Middlewares/auth'); 
const orderRoutes = express.Router();

// Place order
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

// order history
orderRoutes.get('/orderhistory/:userid', auth, async (req, res) => {
    try {
        const { userid } = req.params;

        const orders = await OrderModel.find({ userid });
        res.status(200).send({"msg": orders });
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
});

// order details
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
