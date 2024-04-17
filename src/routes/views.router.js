const { Router } = require('express')
const ProductManager = require('../dao/fsManagers/ProductManager')
const productModel = require('../dao/models/product.model')

const router = Router()

//endpoints

router.get('/products', async (req, res) => {
    try {
        const productManager = req.app.get('productManager')
        
        const filteredProducts = await productManager.getProducts(req.query)
        
        const data = {
            title: 'All Products',
            scripts: ['allProducts.js'],
            styles: ['home.css', 'allProducts.css'],
            useWS: false,
            filteredProducts
        }

        console.log(filteredProducts)

        res.render('index', data)        
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

router.get('/realtimeproducts', async (req, res) => {
    const productManager = req.app.get('productManager')

    let allProducts = await productManager.getProducts(req.query)

    const data = {        
        title: 'Real Time Products', 
        scripts: ['allProducts.js'],
        styles: ['home.css', 'allProducts.css'],
        useWS: false,
        allProducts
    }
    
    res.render('realtimeproducts', data)
})

router.get('/products/create', async (req, res) => {
    const data = {
        title: 'Create Product',
        scripts: ['createProduct.js'],
        styles: ['home.css'],
        useWS: false
    }

    res.render('createProduct', data)
})


router.get('/chat', (_, res) => {
    const data = {
        title: 'Aplicación de chat',
        useWS: true,
        useSweetAlert: true,        
        scripts: ['message.js'],
        styles: ['home.css']
    }

    res.render('message', data)
})

module.exports = router;