require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();


const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

// Middleware
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

// ROutes


(async()=>{
    try{
        await mongoose.connect(DB_URI)
        console.log("DB connection established")
    }catch(err){
        console.error(`DB connection failed \n${err}`);
    }
})()

app.listen(PORT,()=>{
    console.log(`Listening for requests on port ${PORT}`);
})

app.get('/',(req,res)=>{
    res.send({
        msg:"Hello world"
    })
})