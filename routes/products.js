const express = require('express')
const router = express.Router()
const Product = require('../models/product')

// Gettin all
router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

// Gettin one
router.get('/:id', getProduct, (req, res) => {
    res.send(res.product)
})

// Creating one
router.post('/', async (req, res) => {
    const product = new Product({
        sku: req.body.sku,
        picture: req.body.picture,
        brand: req.body.brand,
        name: req.body.name,
        maxPrice: req.body.maxPrice,
        mediumPrice: req.body.mediumPrice,
        minPrice: req.body.minPrice,
        isOffer: req.body.isOffer,
        percent: req.body.percent
    })

    try {
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})

// send Cart Products
router.post('/cart', async (req, res) => {
    const products = req.body.products
    try {
        const productsSchema = products.map(async product => {
            const productMongo = await Product.findById(product.id)
            productMongo.quantity = product.quantity
            return productMongo
        })
        const output = await Promise.all(productsSchema)
        res.status(201).json(output)

    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

// Updating one
router.patch('/:id',  async (req, res) => {
    if (req.body.sku != null) {
        res.product.sku = req.body.sku
    }
    if (req.body.picture != null) {
        res.product.picture = req.body.picture
    }
    if (req.body.brand != null) {
        res.product.brand = req.body.brand
    }
    if (req.body.name != null) {
        res.product.name = req.body.name
    }
    if (req.body.maxPrice != null) {
        res.product.maxPrice = req.body.maxPrice
    }
    if (req.body.mediumPrice != null) {
        res.product.mediumPrice = req.body.mediumPrice
    }
    if (req.body.minPrice != null) {
        res.product.minPrice = req.body.minPrice
    }
    if (req.body.isOffer != null) {
        res.product.isOffer = req.body.isOffer
    }
    if (req.body.percent != null) {
        res.product.percent = req.body.percent
    }

    try {
        const updatedProduct = await res.product.save()
        res.json(updatedProduct)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting one
router.delete('/:id', getProduct, async (req, res) => {
    try {
        await res.product.remove()
        res.json({ message: 'Deleted Product' })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

async function getProduct(req, res, next) {
    let product
    try {
        product = await Product.findById(req.params.id)
        if (product == null) {
           return res.status(404).json({ message: 'Cannot find product'}) 
        }
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }

    res.product = product
    next()
}

module.exports = router