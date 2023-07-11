import { PRODUCTSDAO } from '../dao/index.js'

//Cambiar nombre a la función por "getPaginatedProducts"
//pasarle los parámetros que se recibirán por querys.
//props desde controllers, dao, routesrs etc
const getPaginatedProducts = async (page, limit, category, sort) => {
    const products = await PRODUCTSDAO.getProducts(page, limit, category, sort)
    return products
}

const getProducts = async () => {
    const products = await PRODUCTSDAO.getAllProducts()
    return products
}

const getProductById = async (id) => {
    const product = await PRODUCTSDAO.findById(id)
    return product
}

const addNewProduct = async (prod) => {
    const product = await PRODUCTSDAO.addProduct(prod)
    return product
}

const updateProductById = async (id, prod) => {
    const product = await PRODUCTSDAO.updateProduct(id, prod)
    return product
}

const deleteProductById = async (id) => {
    const prodToDelete = await PRODUCTSDAO.deleteProduct(id)
    return prodToDelete
}


export {
    getPaginatedProducts,
    getProducts,
    getProductById,
    addNewProduct,
    updateProductById,
    deleteProductById
}