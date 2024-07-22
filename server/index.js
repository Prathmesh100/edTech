const express=require('express');
const app= express();

const userRoutes=require('./routes/User');
const profileRoutes=require('./routes/Profile');
const paymentRoutes=require('./routes/Payments');
const courseRoutes=require('./routes/Course');

require('dotenv').config();

const database= require("./config/database");
const cookieParser= require("cookie-parser");
const  cors= require("cors");
const {cloudnairyconnect}=require("./config/cloudinary");
const fileUpload= require("express-fileupload");
const dotenv= require("dotenv");
 
dotenv.config(); 
const PORT= process.env.PORT || 4000; 

//database configuration   
database.connect();
  
//middleware configuration
app.use(express.json());
app.use(cookieParser());

//frontend linking
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials:true,
        // optionSuccessStatus:200,

    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:'/tmp',
    })
)

//cloudinary connection
cloudnairyconnect();

//routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/course",courseRoutes);

//def route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running....."
    });
})

app.listen(PORT,()=>{
    console.log(`app running at ${PORT}`) 
})