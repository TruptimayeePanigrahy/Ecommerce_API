const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userid: {
        type: String, 
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    products: [
        {
            title: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            availability: {
                type: Boolean,
                required: true,
                default: true,
            },
            category: {
                type: String,
                required: true,
            },
        },
    ],
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = { OrderModel };
