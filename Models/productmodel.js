const mongoose = require("mongoose")

const productschema = mongoose.Schema({
    title: { type: String, require: true },
    price: { type: Number, require: true },
    description: { type: String, require: true },
    avaibility: { type: Boolean, require: true ,default:true},
     category:{ type:mongoose.Schema.Types.ObjectId, ref: 'Category',require: true }
    // category:{type:String,require:true}
})

const productmodel = mongoose.model("product", productschema)

module.exports={productmodel}