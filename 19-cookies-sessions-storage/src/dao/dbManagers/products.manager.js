import productModel from '../models/products.model.js'


export default class ProductsManager {
    constructor(){
        console.log('Working products with DB')
    }

    getProducts = async () => {
        const products = await productModel.find().lean()
        return products
    }

    getProductById = async (id) => {
        const product = await productModel.findOne({_id: id})
        return product
    }

    addProduct = async (product) => {
        const result = await productModel.create(product)
        return result
    }

    updateProduct = async (id, product) => {
        const result = await productModel.updateOne({_id: id}, product)
        return result
    }

    deleteProduct = async (id) => {
        const result = await productModel.deleteOne({_id: id})
        return result
    }
}

