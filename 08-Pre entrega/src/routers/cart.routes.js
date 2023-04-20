import Router from 'express';
import CartManager from '../managers/CartManager.js';
import ProductManager from '../managers/ProductManager.js'
const router = Router();

const cartManager = new CartManager('./src/files/carts.json')
const productManager = new ProductManager ('./src/files/products.json')


//Nuevo carrito vacío
router.post('/', async (req,res) => {

    const newCart = {
        products: []
    }

    const result = await cartManager.addCart(newCart)
    res.send({status: 'success', result})
})


router.get('/', async (req,res) => {
    const carts = await cartManager.getCarts()
    res.send({status: 'success', carts})
})


router.get('/:cid', async (req, res) => {
    const cid = Number(req.params.cid)
    const cart = await cartManager.getCartById(cid)
    if(!cart) return res.send({error:`Cart N° ${cid} not found`})
    res.send({status: 'success', cart})
})


router.post('/:cid/product/:pid', async (req,res) => {
    
    const cid = Number(req.params.cid)
    const pid = Number(req.params.pid)
    
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