const express = require("express");
const appServer = express.Router();
const {getAddData,postData,viewProduct,deleteProduct,deleteProductByPost,
  viewEditPage,editPage,searchProduct,sorting} = require("../Controller/adminController");

const multer = require('multer');
const PATH = require('path');


const fileStorage = multer.diskStorage({
  destination:(req,file,callback)=>{
    callback(null,PATH.join(__dirname,"..","uploads"),(err,data)=>{
      if(err) throw err;
    });
  },
  filename:(req,file,callback)=>{
    callback(null,file.originalname,(err,data)=>{
      if(err) throw err;
    });
  }
});

const fileFilter = (req,file,callback)=>{
  if(
    file.mimetype.includes("png")||
    file.mimetype.includes("jpg")||
    file.mimetype.includes("jpeg")||
    file.mimetype.includes("webp")

  ){
    callback(null,true);
  }else{
    callback(null,false);
  }
}

const upload = multer({
  storage:fileStorage,
  fileFilter:fileFilter,
  limits:{fieldSize:1024*1024*5},
})
const upload_type = upload.array("product_image",2);



appServer.get("/admin/addProd", getAddData);
//appServer.post('/postData',upload.single("product_image"),postData);
appServer.post('/postData',upload_type,postData);
appServer.get('/admin/viewProd',viewProduct);
appServer.get('/admin/deleteProd/:id',deleteProduct);
appServer.post('/admin/deleteProd',deleteProductByPost);
appServer.get('/admin/editProd/:id',viewEditPage);
appServer.post('/admin/updateProd',editPage);
appServer.post('/admin/searchProd',searchProduct);

appServer.get('/admin/sorting/:order',sorting);

module.exports = appServer;
