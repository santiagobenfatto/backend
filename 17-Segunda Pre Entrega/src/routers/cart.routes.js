import Router from 'express';
import CartManager from '../dao/dbManagers/carts.manager.js';
import ProductManager from '../dao/dbManagers/products.manager.js'

const router = Router();
const cartManager = new CartManager()
const productManager = new ProductManager ()


router.post('/', async (req,res) => {
    try {
        const result = await cartManager.addCart()
        res.send({status: 'success', result})
        
    } catch (error) {
        res.status(400).send({status: 'error', error})
    }
})


router.put('/:cid', async (req, res) => {
    const { cid } = req.params
    const { products } = req.body
    try {
        const productToUpdate = await cartManager.updateCart(cid, ...products)
        res.send({status: 'success', productToUpdate})
    } catch (error) {
        res.status(400).send({status: 'error', error})
    }
})

router.get('/', async (req,res) => {
    const carts = await cartManager.getCarts()
    res.send({status: 'success', carts})
})


router.get('/:cid', async (req, res) => {
    const cid = req.params.cid
    const cart = await cartManager.getCartById(cid)
    if(!cart) return res.send({error:`Cart N° ${cid} not found`})
    res.send({status: 'success', cart})
})


router.post('/:cid/product/:pid', async (req,res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    
    const carts = await cartManager.getCarts()
    const prods = await productManager.getProducts()

    const cartIndex = carts.findIndex( c => c.id === cid)
    const prodIndex = prods.findIndex( p => p.id === pid)

    if(cartIndex < 0 || prodIndex <0){
        return res.status(404).send({error:'Not found'})
    }
    const result = await cartManager.addProductToCart(cid, pid)
    res.send({status:'success', result})
})



export default router