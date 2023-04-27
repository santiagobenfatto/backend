import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';


const router = Router()
const productManager = new ProductManager ('./src/files/products.json')


router.post('/', async (req,res) => {
    const product = req.body
    
    if (!product.status){
        product.status = true
    }
    if(!product.title || !product.description || !product.code || !product.price || !product.category || !product.stock) {
        return res.status(400).send({error: 'incomplete values'})
    }
    const result = await productManager.addProduct(product)
    const products = await productManager.getProducts()
    const io = req.app.get('socketio');
    io.emit("showProducts", { products });
    
    res.send({status:'success', result})   
})


router.get('/', async (req, res) => {
    const products = await productManager.getProducts()
    const prods = []
    let limit = Number(req.query.limit)   
    if(limit && limit <= products.length){
        for (let i = 0; i < limit; i++){
            prods.push(products[i])
        }
        res.render('home', {prods})
    }else {
        res.render('home', {products})
    }
})


router.get('/:pid', async (req, res) => {
    let prodID = Number(req.params.pid)
    const prod = await productManager.getProductById(prodID)
    if(!prod) return res.send({error:`El producto N° ${prodID} no existe`})
    res.send({status: 'success', prod})
})


router.put('/:pid', async (req, res) => {
    const pid = Number(req.params.pid);
    const productUpdate = req.body;
    if (!productUpdate  || productUpdate.id) {
      return res.status(400).send({ error: 'Wrong body format' });
    }
    await productManager.updateProduct(pid, productUpdate);
    res.send({ status: 'success', message: 'user updated' });
});


router.delete('/:pid', async (req, res) => {
    const pid = Number(req.params.pid)
    const prodID = await productManager.getProductById(pid)
    if (!prodID){
        res.status(404).send({status:'error', error: 'product not found'})
    } else {
        await productManager.deleteProduct(pid)
        res.send({status: 'success', message: 'product deleted'})
    }

    const products = await productManager.getProducts()
    const io = req.app.get('socketio');
    io.emit("showProducts", { products });

})

export default router