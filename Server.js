require('dotenv').config();
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5900;
const path = require('path');
const adminRoute = require('./Router/adminRouter');
const userRoute = require('./Router/userRouter');

server.set('view engine','ejs');
server.set('views','View');
server.use(express.urlencoded({extended:true}));
server.use(express.static(path.join(__dirname,'Public')));
server.use(express.static(path.join(__dirname,"uploads")));
server.use(adminRoute,userRoute);


mongoose.connect(process.env.DB_URL)
.then(res=>{
    console.log("The Database is Connected Successfully");
    server.listen(PORT,()=>{
        console.log("The Server is running Successfully");
    })
}).catch(error=>{
        console.log("Failed to Connected with the database ",error);
    })
