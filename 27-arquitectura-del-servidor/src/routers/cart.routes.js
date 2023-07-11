import Router from './router.routes.js';
import {
  addCart,
    getCarts,
    getCartById,
    addProductToCart,
    updateCart,
    addProductQty,
    deleteCartProducts,
    deleteProductFromCart

} from '../controllers/carts.controller.js'

export default class cartRouter extends Router {
  init(){
    this.post('/', addCart)
    this.get('/', getCarts)
    this.get('/:cid', getCartById)
    this.post('/:cid/products/:pid', addProductToCart)
    this.put('/:cid', updateCart)
    this.put('/:cid/products/:pid', addProductQty)
    this.delete('/:cid', deleteCartProducts)
    this.delete('/:cid/products/:pid', deleteProductFromCart)
  }
}




