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

        res.render('index', data)        
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

router.get('/products/detail/:pid', async (req, res) => {
    try {
        const productManager = req.app.get('productManager')
        // const cartManager = req.app.get('cartManager')

        const prodId = req.params.pid
        const product = await productManager.getProductById(prodId)
        
        // //agrego una unidad del producto al primer carrito que siempre existe
        // const carts = await cartManager.getCarts()   
        // // console.log(JSON.stringify(carts, null, '\t'))     
        // await cartManager.addProductToCart(carts[0]._id, prodId, 1);

        let data = {
            title: 'Product detail',
            scripts: ['productDetail.js'],
            styles: ['home.css', 'productDetail.css'],
            useWS: false,
            useSweetAlert: true,
            product
        }
        
        res.render('productDetail', data)        
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

router.get('/products/addcart/:pid', async (req, res) => {
    try {
        const productManager = req.app.get('productManager')
        const cartManager = req.app.get('cartManager')

        const prodId = req.params.pid
        const product = await productManager.getProductById(prodId)
        
        //agrego una unidad del producto al primer carrito que siempre existe
        const carts = await cartManager.getCarts()   
        // console.log(JSON.stringify(carts, null, '\t'))     
        await cartManager.addProductToCart(carts[0]._id, prodId, 1);   
        
        res.redirect(`/products/detail/${prodId}`)
        // HTTP 200 OK => producto modificado exitosamente
        // res.status(200).json({message: 'Producto agregado con éxito'})
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

router.get('/carts/:cid', async (req, res) => {
    try {
        const cartManager = req.app.get('cartManager')
        const cartId = req.params.cid
        const cart = await cartManager.getCartById(cartId)               

        // console.log(JSON.stringify(cart.products, null, '\t'))

        let data = {
            title: 'Cart detail',
            // scripts: ['cartDetail.js'],
            styles: ['home.css', 'cartDetail.css'],
            useWS: false,
            cart
        }
        
        res.render('cartDetail', data)        
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
    console.log('creando producto')
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