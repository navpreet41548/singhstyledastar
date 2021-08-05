const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name:{
        type: String, 
    },
    password:{
        type: String,
    },
    images: [
        {
            url:String,
            id: String
        }    
    ],
    video: [
        {
            url:String,
            id: String
        }    
    ]
})


 const AdminModel =  mongoose.model("Admin", adminSchema)

  module.exports = AdminModel