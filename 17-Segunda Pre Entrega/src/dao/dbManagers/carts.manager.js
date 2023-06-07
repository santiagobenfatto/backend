import cartModel from "../models/carts.model.js";
import productModel from "../models/products.model.js";

export default class CartsManager {
    constructor() {
        console.log('Working carts with DB')
    }

    getCarts = async () => {
        const carts = await cartModel.find().populate('products.product')
        return carts
    }
    
    getCartById = async (id) => {
        const carts = await cartModel.findOne({_id: id})
        return carts
    }

    addCart = async () => {
        const newCart = {
            products:[]
          };
        const result = await cartModel.create(newCart)
        return result
    }

    updateCart = async (cartId, prods) => {
        const cart = await cartModel.findById(cartId)
        const productsMap = prods.map((prod) => ({
            product: prod,
            quantity: 1, // Puedes establecer la cantidad inicial según tus necesidades
          }));
        cart.products.push(...productsMap)
        await cart.save();
    }

    addProductQty = async (cartId, prodId, qty) => {
        const cart = await cartModel.findById(cartId);
                
        if (!cart) {
            throw new Error('Cart not found');
        }
        
        const productIndex = cart.products.findIndex(
            (product) => product.product.toString() === prodId
        );

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += qty;
        } else {
            cart.products.push({ product: prodId, quantity: qty });
        }
        
        await cart.save();
    }

    addProductToCart = async (cartId, prodId) => {
        const cart = await cartModel.findOne({ _id: cartId })
        const productIndex = cart.products.findIndex(
            (product) => product.product.toString() === prodId
        )
        console.log(productIndex)
        if (productIndex !== -1) {
            // El producto ya existe en el carrito, aumentar la cantidad
            cart.products[productIndex].quantity += 1
        } else {
            // El producto no existe en el carrito, agregarlo con cantidad 1
            cart.products.push({ product: prodId, quantity: 1 })
        }

        await cart.save();
    }

    deleteProductFromCart = async (cartId, prodId) => {
            const cart = await cartModel.findById(cartId);
            const productIndex = cart.products.findIndex((product) => product._id.toString() === prodId);
            if (productIndex !== -1) {
              cart.products.splice(productIndex, 1);
              await cart.save();
            }
    }

    deleteCart = async (id) => {
        await cartModel.deleteOne({_id: id})
    }

    deleteCartProducts = async (cartId) => {
        const cart = await cartModel.findById(cartId)
        cart.products = [];
        await cart.save();
    }



}
