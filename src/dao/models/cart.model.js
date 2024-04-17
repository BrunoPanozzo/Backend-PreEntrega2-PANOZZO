const mongoose = require('mongoose')

const cartsCollection = 'carts';

const cartSchema = new mongoose.Schema({
    id: {
        type: Number,
        required : true,
        unique: true
    },
    products: {
        type: [
            { 
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                },
                quantity: Number
            }
        ],
        default: []
    }
})

module.exports = mongoose.model('Cart',cartSchema, 'carts');