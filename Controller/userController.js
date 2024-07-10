const model = require('../Model/product');

const allUserProduct = async(req,res)=>{

    try{
        let userData = await model.find();
        if(userData){
            res.render('User/Products',{
                title:'All products',
                data:userData
            })
        }

    }catch(error){
        console.log("Data Not Found",error);

    }
}

const singleProduct = async(req,res)=>{
    try{
        let product_id = req.params.id;
        // console.log("Collected Id: ",product_id);
        let singleValue = await model.findById(product_id);
        //  console.log("Collected Product Deatils By Id: ",singleValue);
        if(singleValue){
           res.render('User/ProductDetails',{
            title:"Products All details",
            data:singleValue
            })
        }
    }catch(error){
        console.log("Product Not Found",error);

    }
    
    
 }


module.exports ={
    allUserProduct,
    singleProduct
}