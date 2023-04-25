const mongoose = require('mongoose');
const {Schema}  = mongoose
const AuthSchema = Schema({
    username : {
        type : String,
        required:true,
    },
    email : {
        type : String,
        required:true,
        unique:true
    },
    password: {
        type : String,
        required:true
    },
})
let User = mongoose.model("User",AuthSchema)
module.exports = User