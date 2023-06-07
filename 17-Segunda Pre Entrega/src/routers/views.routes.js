import { Router } from "express"
import CartManager from '../dao/dbManagers/carts.manager.js'
import ProductManager from '../dao/dbManagers/products.manager.js'
import productModel from "../dao/models/products.model.js"


const router = Router()


const cartManager = new CartManager()
const productManager = new ProductManager()


router.get('/', async (req,res) => {
    const { page = 1, limit = 3, query, sort} = req.query
    
    const options = {
        limit: Number(limit),
        page: Number(page),
        lean: true
    };

    if (query) {
        options.query = { tipo: query }
    }

    if (sort) {
        if (sort === 'asc') {
            options.sort = { price: 1 }
        } else if (sort === 'desc') {
            options.sort = { price: -1 }
        }
    }

    const {
        docs,
        totalPages,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage,
 
    } = await productModel.paginate({}, options)
    
    const products = docs

    res.render('products', {
        products,
        totalPages,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage
    })
})




router.get('/carts/:cid', async (req,res) => {
    const { cartId } = req.query

    try {
        const cart = await cartManager.getCartById(cartId)
        res.render('products', {cart})
    } catch (error) {
        console.log(error)
    }
})

export default router
