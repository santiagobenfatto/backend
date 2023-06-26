import Router from './router.routes.js';
import CartManager from '../dao/dbManagers/carts.manager.js';
import ProductManager from '../dao/dbManagers/products.manager.js'


const cartManager = new CartManager()
const productManager = new ProductManager ()


/* 
    ===== FALTA CUSTOMIZAR ERRORES Y RESPUESTAS =====
    ===== TRY CATCHEAR TODO =====
*/

export default class cartRouter extends Router {
  init(){
    this.post('/', async (req,res) => {
        try {
            const result = await cartManager.addCart()
            res.send({status: 'success', result})
            
        } catch (error) {
            res.status(400).send({status: 'error', error})
        }
    })
    
    
    this.get('/', async (req,res) => {
        const carts = await cartManager.getCarts()
        res.send({status: 'success', carts})
    })
    
    
    this.get('/:cid', async (req, res) => {
        const cid = req.params.cid
        const cart = await cartManager.getCartById(cid)
        if(!cart) return res.send({error:`Cart N° ${cid} not found`})
        res.send({status: 'success', cart})
    })
    
    this.post('/:cid/products/:pid', async (req,res) => {
        const cartId = req.params.cid
        const prodId = req.params.pid
        
        try{
        const carts = await cartManager.getCarts()
        const prods = await productManager.getProducts()
    
        const cartIndex = carts.findIndex( c => c.id === cartId)
        const prodIndex = prods.findIndex( p => p.id === prodId)
    
            if(cartIndex < 0 || prodIndex <0){
            }
            const result = await cartManager.addProductToCart(cartId, prodId)
            res.send({status:'success', result})
            
        }catch(error){
            console.log(error)
            return res.status(404).send({error:'Not found'})
        }
    })
    
    
    this.put('/:cid', async (req, res) => {
      const cartId = req.params.cid
      const products = req.body
      
      try {
            const cart = await cartManager.getCartById(cartId)
            if (!cart) {
            return res.status(404).send({ error: 'Cart not found' });
            }
            await cartManager.updateCart(cartId, products)
            return res.send({status: 'Succes', message: 'Cart updated' });
        } catch (error) {
            return res.status(400).send({ error: 'error' });
        }
    });
    
    
    this.put('/:cid/products/:pid', async (req, res) => {
        try {
          const { cid, pid } = req.params;
          const { qty } = req.body;
      
          // Verificar si el carrito existe
          const cart = await cartManager.getCartById(cid);
          if (!cart) {
            return res.status(404).send({ error: 'Cart not found' });
          }
      
          await cartManager.addProductQty(cart, pid, qty)
    
          return res.send({ status: 'succes', message: 'Quantity updtated' });
        } catch (error) {
          console.error(error);
          return res.status(500).send({ error: 'Cart cannot be updated' });
        }
      });
    
    
    this.delete('/:cid', async (req, res) => {
        try {
            const cartId = req.params.cid;
        
            const cart = await cartManager.getCartById(cartId);
        
            if (!cart) {
              return res.status(404).send({ message: 'Cart not found' });
            }
            
            await cartManager.deleteCartProducts(cart)
            res.send({message: 'Succes, products deleted'});
    
          } catch (error) {
            res.status(500).send({error: 'Error'});
          }
    })
    
    this.delete('/:cid/products/:pid', async (req, res) => {
        const { cid, pid } = req.params
        try {
          await cartManager.deleteProductFromCart(cid, pid)
          res.send({ status: 'succes', message: 'product removed'})
        } catch (error) {
          return res.status(404).send({ error: 'Not found' })
        }
    })
  }
}



