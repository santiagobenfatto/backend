import { 
    getAllCarts,
    getCartById as getCartId,
    newEmptyCart,
    updateCart as updateOneCart,
    addProductQty as addProdQty,
    addProdToCart,
    deleteProductFromCart as deleteProdFromCart,
    deleteCartProducts as deleteCartProds
 } from '../services/carts.services.js'
 import { getPaginatedProducts as getAllProducts } from '../services/products.services.js'


const addCart = async (req,res) => {
    try {
        const result = await newEmptyCart()
        res.send({status: 'success', result})
        
    } catch (error) {
        res.status(400).send({status: 'error', error})
    }
}

const getCarts = async (req,res) => {
    const carts = await getAllCarts()
    res.send({status: 'success', carts})
}

const getCartById = async (req, res) => {
    const cid = req.params.cid
    const cart = await getCartId(cid)
    if(!cart) return res.send({error:`Cart N° ${cid} not found`})
    res.send({status: 'success', cart})
}

const addProductToCart = async (req,res) => {
    const cartId = req.params.cid
    const prodId = req.params.pid
    
    try{
        const carts = await getAllCarts()
        const prods = await getAllProducts()

        const cartIndex = carts.findIndex( c => c.id === cartId)
        const prodIndex = prods.findIndex( p => p.id === prodId)

        if(cartIndex < 0 || prodIndex <0){
        }
        const result = await addProdToCart(cartId, prodId)
        res.send({status:'success', result})
        
    }catch(error){
        console.log(error)
        return res.status(404).send({error:'Not found'})
    }
}

const updateCart = async (req, res) => {
    const cartId = req.params.cid
    const products = req.body
    
    try {
        const cart = await getCartId(cartId)
        if (!cart) {
        return res.status(404).send({ error: 'Cart not found' });
        }
        await updateOneCart(cartId, products)
        return res.send({status: 'Succes', message: 'Cart updated' });
    } catch (error) {
        return res.status(400).send({ error: 'error' });
    }
}

const addProductQty = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { qty } = req.body;
    
        // Verificar si el carrito existe
        const cart = await getCartId(cid);
        if (!cart) {
        return res.status(404).send({ error: 'Cart not found' });
        }
    
        await addProdQty(cart, pid, qty)

        return res.send({ status: 'succes', message: 'Quantity updtated' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Cart cannot be updated' });
    }
}

const deleteCartProducts = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await getCartId(cartId);
    
        if (!cart) {
            return res.status(404).send({ message: 'Cart not found' });
        }
        
        await deleteCartProds(cart)
        res.send({message: 'Succes, products deleted'});
    } catch (error) {
        res.status(500).send({error: 'Error'});
    }
}

const deleteProductFromCart =async (req, res) => {
    const { cid, pid } = req.params
    try {
        await deleteProdFromCart(cid, pid)
        res.send({ status: 'succes', message: 'product removed'})
    } catch (error) {
        return res.status(404).send({ error: 'Not found' })
    }
}

export {
    addCart,
    getCarts,
    getCartById,
    addProductToCart,
    updateCart,
    addProductQty,
    deleteCartProducts,
    deleteProductFromCart
}