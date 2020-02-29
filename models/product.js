const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    sku: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    maxPrice: {
        type: Number,
        required: true
    },
    mediumPrice: {
        type: Number,
        required: true
    },
    minPrice: {
        type: Number,
        required: true
    },
    isOffer: {
        type: Boolean,
        required: true
    },
    percent: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema)