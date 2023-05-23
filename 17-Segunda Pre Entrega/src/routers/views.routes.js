import { Router } from "express";
import CartManager from '../dao/dbManagers/carts.manager.js'
import ProductManager from '../dao/dbManagers/products.manager.js'
import productModel from "../dao/models/products.model.js";


const router = Router()


const cartManager = new CartManager()
const productManager = new ProductManager()


router.get('/', async (req,res) => {
    const { page = 1, limit = 2, query, sort} = req.query
    
    const {
        docs,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage
    } = await productModel.paginate({}, {
        limit,
        page,
        query,
        sort,
        lean : true})
    
    const products = docs

    res.render('products', {
        products,
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
