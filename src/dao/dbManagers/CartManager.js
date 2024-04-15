const cartModel = require('../models/cart.model')

class CartManager {

    //variables internas
    static #lastID_Cart = 0

    constructor() { }

    inicializar = async () => {
        // No hacer nada
        // Podríamos chequear que la conexión existe y está funcionando
        if (cartModel.db.readyState !== 1) {
            throw new Error('Error al conectarse a la BD de mongodb!')
        }
        else {
            const carts = await this.getCarts() 
            CartManager.#lastID_Cart = this.#getHigherID(carts)
        }
    }

    //métodos internos

    #getHigherID = (carts) => {
        let higherID = 0
        carts.forEach(item => {
            if (item.id > higherID)
                higherID = item.id
        });
        return higherID
    }

    //retornar un ID único para cada carrito nuevo
    #getNuevoID = () => {
        CartManager.#lastID_Cart += 1
        return CartManager.#lastID_Cart;
    }

    //métodos públicos
    getCarts = async () => {
        try {
            const carts = await cartModel.find()
            return carts.map(d => d.toObject({ virtuals: true }))
        }
        catch (err) {
            return []
        }
    }

    getCartById = async (cartId) => {
        const cart = await cartModel.findOne({id:cartId})
        if (cart)
            return cart
        else {
            console.error(`El carrito con código "${cartId}" no existe.`)
            return
        }
    }

    addCart = async (products) => {
        let nuevoCarrito = await cartModel.create({
            id: this.#getNuevoID(),
            products
        })
        // console.log(nuevoCarrito)
    }

    //agregar un producto al array de productos de un carrito determinado
    addProductToCart = async (cartId, prodId, quantity) => {
        //obtengo un carrito
        const cart = await this.getCartById(cartId)
        //obtengo los productos del carrito        
        const productsFromCart = cart.products
        const productIndex = productsFromCart.findIndex(item => item.id === prodId)
        if (productIndex != -1) {
            //existe el producto en el carrito, actualizo sólo su cantidad
            productsFromCart[productIndex].quantity += quantity
        }
        else {
            //nop existe el producto en el carito, debo crear la entrada completa
            const newProduct = {
                id: prodId,
                quantity: quantity
            }
            productsFromCart.push(newProduct)
        }
        //
        // await cart.save()
        await cartModel.updateOne({id : cartId}, cart)
    }

    deleteCart = async (cartId) => {
        await cartModel.deleteOne({ id: cartId })
    }
}

module.exports = CartManager
