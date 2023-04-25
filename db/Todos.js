let mongoose = require("mongoose")
const {Schema} = mongoose
let addtodo = mongoose.Schema({
    text : {type:String,required:true,},
    isRead: { type: Boolean, default: false },
})
let Todo = mongoose.model("Todo",addtodo);
module.exports = Todo