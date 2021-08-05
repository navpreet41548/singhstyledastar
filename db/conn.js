const dotenv = require("dotenv");

dotenv.config();
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true ,useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false} ,(err) => {
    if(!err){ console.log("MongoDB Connection Succeeded");}
    else{
        console.log(err);
    } 
})
