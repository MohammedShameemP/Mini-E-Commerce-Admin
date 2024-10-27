const mongoose=require("mongoose")

const adminschema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

const Admin = mongoose.model('admins', adminschema);

module.exports = Admin