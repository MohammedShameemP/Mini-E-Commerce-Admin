const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    phonenumber: { type: String, required: true },
    password: { type: String, required: true },
    active:{type:Boolean,default:true}
});

const Users = mongoose.model('users', userschema);

module.exports = Users

