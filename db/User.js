const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
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
AuthSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (error) {
      return next(error);
    }
  });
let User = mongoose.model("User",AuthSchema)
module.exports = User