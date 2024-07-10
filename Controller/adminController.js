const productModel = require('../Model/product');

const getAddData = (req,res)=>{
    res.render('Admin/addProduct',{
        title: 'Admin products'
    });
}

const postData = async(req,res)=>{
    try{
        console.log("The data collected from the addProduct Form: ",req.body,req.files);
        let arr = req.files.map((value)=>{

            return value.originalname;

        })
        console.log("The array value: ",arr);
        let formData = new productModel({
            product_Name: req.body.pname,
            product_Price: req.body.pprice,
            product_Color : req.body.pcolor,
            product_Company: req.body.pcom,
            product_Image: arr
        })
        
        let Saved = await formData.save();
        if (Saved){
            console.log("Product Data is saved");
        }
        
        res.redirect('/admin/viewProd');
    }catch(error){
        console.log("Error at Collecting Product Details: ",error);
    }

}
const viewProduct = async(req,res)=>{
    try{
        let product = await productModel.find();
        if(product){
            res.render('Admin/viewProduct',{
                title:"Admin products",
                data: product
                
            })
        }
    }catch(error){

        console.log("Data not Fetched",error);
    }
}

const deleteProduct=async(req,res)=>{  // Delete using Get method
    try{
        let product_id = req.params.id;
        console.log("The Id to delete the Product is: ",product_id);
        await productModel.deleteOne({_id:product_id});
        res.redirect("/admin/viewProd");
    }catch(error){
        console.log("Error in deletion: ",error);
    }
}
const deleteProductByPost= async(req,res)=>{ // Delete Using Post method
    try{
        let product_id = req.body.id;
        console.log("The Id to delete the Product is: ",product_id);
        await productModel.findById(product_id).deleteOne();
        res.redirect("/admin/viewProd");
    }catch(error){
        console.log("Error in deletion: ",error);
    }
}

const viewEditPage = async(req,res)=>{

    try{
        let prod_id = req.params.id;
        console.log("Product id collected for Edit:",prod_id);
        let old = await productModel.findById(prod_id);
        console.log("The Collected old product Id: ",old);
        if(old){
            res.render('Admin/editproduct',{
                title:"edit product",
                data: old
            })
        }

    }catch(error){
        console.log("Product not Found");
    }

}

const editPage = async(req,res)=>{
    try{
        const prodId = req.body.id;
        console.log("Id got form body: ",prodId);
        console.log("Received new Value: ",req.body);
        const updated_Pname = req.body.pname;
        const updated_Pprice = req.body.pprice;
        const updated_Pcolor = req.body.pcolor;
        const updated_Pcompany = req.body.pdes;

        let productdata = await productModel.findById(prodId);
        console.log("Existing Data: ",productdata);
        productdata.product_Name = updated_Pname;
        productdata.product_Price = updated_Pprice;
        productdata.product_Color = updated_Pcolor;
        productdata.product_Company = updated_Pcompany;

        let saved = await productdata.save();

        if(saved){
            console.log("Product is saved");
        }
        res.redirect('/admin/viewProd');

    }catch(error){
        console.log("Error in Editing Data");

    }
}

const searchProduct = async(req,res)=>{
    
    try{
        let searchProd = req.body.SearchValue.trim();
        
        let prodDetails = await productModel.find({$or:[{"product_Name":searchProd},{"product_Company":searchProd},{"product_Color:":searchProd}]})
        console.log("The Searched value from admin: ",prodDetails);
        res.render("Admin/viewProduct",{
            title: 'saerch value',
            data: prodDetails
        })

    }catch(error){
        console.log("Searched Product is not fetched",error);

    }
}



const sorting = async(req,res)=>{
    try{
        let order = req.params.order;
        console.log(order);
        let product = await productModel.find();

        let sorted;
        if(order == 'ascending'){
            sorted = product.sort(function(a,b){
                return a.product_Price - b.product_Price;
            });
        }else{
            sorted = product.sort(function(a,b){
                return b.product_Price - a.product_Price;
            })
        }
        if(sorted){
            res.render("Admin/viewProduct",{
                title:'Sorting Process',
                data:sorted
            })
        }
        
    }catch(error){
        console.log("Error in Sorting ",error);
    }
}



// Another way of exporting
module.exports={
    getAddData,
    postData,
    viewProduct,
    deleteProduct,
    deleteProductByPost,
    viewEditPage,
    editPage,
    searchProduct,
    sorting
}