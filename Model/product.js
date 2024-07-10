const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    product_Name :{
        type:String,
        require:true
    },
    product_Price :{
        type:Number,
        require:true
    },
    product_Color :{
        type:String,
        require:true
    },
    product_Company :{
        type:String,
        require:true
    },
    // product_Image :{
    //     type:String,
    //     require:true
    // },
    product_Image :{
            type:[String],
            require:true
        },
    
},{
    timestamps:true,
    versionKey:false
});

const productModel = new mongoose.model("Product_deatails",ProductSchema);
module.exports = productModel;