const mongoose = require('mongoose')

const productschema = new mongoose.Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    details: { type: String, required: true },
    active:{type:Boolean,default:true}
});

const Products = mongoose.model('products', productschema);

module.exports = Products

