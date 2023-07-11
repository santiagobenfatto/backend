import { CARTSDAO } from '../dao/index.js'


const getAllCarts = async () => {
    const carts = await CARTSDAO.getCarts()
    return carts
}

const getCartById = async (id) => {
    const cart = await CARTSDAO.getCartById(id)
    return cart
}

const newEmptyCart = async  () => {
    //Tal vez en controllers en newcart
    const newCart = {
        products:[]
    }
    const result = await CARTSDAO.addCart(newCart)
    return result
}

const updateCart = async (cartId, prods) => {
    const update = await CARTSDAO.updateCart(cartId, prods);
    return update
}

const addProductQty = async ( cartId, prodId, qty) => {
    const addProd = await CARTSDAO.addProductQty(cartId, prodId, qty)
    return addProd
}

const addProdToCart = async (cartId, prodId) => {
    const prod = await CARTSDAO.addProductToCart(cartId, prodId)
    return prod
}

const deleteProductFromCart = async (cartId, prodId) => {
    const prodCart = await CARTSDAO.deleteProductFromCart(cartId, prodId)
    return prodCart
}
//Not used, so not imported.
const deleteCart = async (id) => {
    const cartId = await CARTSDAO.deleteCart(id)
    return cartId
}

const deleteCartProducts = async (cartId) => {
    const cart = CARTSDAO.deleteCartProducts(cartId)
    return cart
}


export {
    getAllCarts,
    getCartById,
    newEmptyCart,
    updateCart,
    addProductQty,
    addProdToCart,
    deleteProductFromCart,
    deleteCartProducts
}