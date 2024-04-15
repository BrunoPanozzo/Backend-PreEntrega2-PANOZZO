const { Router } = require('express')
const ProductManager = require('../dao/fsManagers/ProductManager')

const router = Router()

//endpoints

router.get('/', async (req, res) => {
    try {
        const productManager = req.app.get('productManager')
        let filteredProducts = await productManager.getProducts()

        const data = {
            title: 'All Products',
            scripts: ['allProducts.js'],
            styles: ['home.css', 'allProducts.css'],
            useWS: false,
            filteredProducts
        }

        res.render('index', data)

        // HTTP 200 OK
        // res.status(200).json(allProducts)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

router.get('/realtimeproducts', async (req, res) => {
    const productManager = req.app.get('productManager')

    let allProducts = await productManager.getProducts()

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