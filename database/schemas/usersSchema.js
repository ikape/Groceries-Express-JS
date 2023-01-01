const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   
    email:{
        type: String,
        require: true,
        unique: true,
    },

    password:{
        type: String,
        require: true,
    },
  
    createdAt:{
        type: Date,
        require: true,
        default: new Date()
    },
})

module.exports = mongoose.model('Users', UserSchema)
