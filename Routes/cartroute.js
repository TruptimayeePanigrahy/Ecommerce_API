const express = require('express');
const { cartmodel } = require('../Models/cartmodel');
const { auth } = require('../Middlewares/auth');
const cartroute = express.Router();


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


cartroute.get('/getcartproduct', auth, async (req, res) => {
    try {
        const userID = req.body.userid; 
        const cartProducts = await cartmodel.find({ userID });

        res.status(200).json({ "msg": cartProducts });
    } catch (error) {
        res.status(401).json({ "msg": error.message });
    }
});


cartroute.patch("/increasequantity/:itemid",auth,async(req,res)=>{
    try {
        let data = await cartmodel.find({_id:req.params.itemid,userid:req.body.userid});
            data[0].quantity++;
            data[0].save();
            res.status(201).send({"msg":"quantity  increases by one"})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({msg:error.message})
    }
})

cartroute.patch("/decreasequantity/:itemid",auth,async(req,res)=>{
    try {
        let data = await cartmodel.find({_id:req.params.itemid,userid:req.body.userid});
          
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
