const mongoose=require('mongoose');

const cartProductSchema=mongoose.Schema({
    title: {
        type: String,
        required: true
      },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    description: {
        type: String,
        required: true
    },
    avaibility:
    {
        type: Boolean,
        require: true,
        default: true
    },
    userid: {
        type: String
    },
    category: {
        type: String,
        require:true
    }
})


const cartmodel = mongoose.model("cartProduct", cartProductSchema);

module.exports={cartmodel}