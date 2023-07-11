import { 
    getPaginatedProducts as getProducts,
    getProducts as getAllProducts,
    getProductById,
    addNewProduct,
    updateProductById,
    deleteProductById
} from '../services/products.services.js'

const addProduct = async (req,res) => {
    const products = await getAllProducts()
    const product = req.body

    const foundCode = products.find(prod => prod.code === product.code)
    if(foundCode){
        return res.sendClientError({error:`product code ${product.code} already exists`})
    }

    if (!product.status){
        product.status = true
    }
    if(!product.title || !product.description || !product.code || !product.price || !product.category || !product.stock) {
        return res.status(400).send({error: 'incomplete values'})
    }
    const result = await addNewProduct(product)
    res.sendSuccess({status:'success', result})
}

const getViewsProducts = async (page, limit, category, sort) => {
    try {
        let actualPage = Number(page) || 1
        let actualLimit = Number(limit) || 10
        let actualCategory = category
        let actualSort = sort
        
        const products = await getProducts(actualPage, actualLimit, actualCategory, actualSort)

        // Filtrar por categoría si se proporciona
        let filteredProducts = products.docs;
        if (category) {
          filteredProducts = filteredProducts.filter(product => product.category === actualCategory);
        }

        // Ordenar los productos
        if (sort) {
            if (sort === 'asc') {
            products.sort((a, b) => a.price - b.price)
            } else if (sort === 'desc') {
            products.sort((a, b) => b.price - a.price)
            }
        }

        //Limite
        if (limit && limit <= products.length) {
            products.splice(limit)
        }

        // Paginación
        let totalPages = products.totalPages
        let startIndex = (page -1) * limit
        let endIndex = startIndex + limit
        let prods = filteredProducts.slice(startIndex, endIndex)

        // Objeto de respuesta
        let response = {
            status: 'success',
            payload: prods,
            totalPages: totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null,
            page: page,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevLink: page > 1 ? `/products?page=${page - 1}&limit=${limit}` : null,
            nextLink: page < totalPages ? `/products?page=${page + 1}&limit=${limit}` : null
        }

        return response
    
    } catch (error) {
        // res.sendServerError({ error: error, message: 'Se produjo un error al obtener los productos.' })
        console.log(error)
    }
}


const getPaginatedProducts = async (req, res) => {
    try {
        let page = Number(req.query.page) || 1
        let limit = Number(req.query.limit) || 10
        let category = req.query.category
        let sort = req.query.sort
        
        const products = await getProducts(page, limit, category, sort)

        // Filtrar por categoría si se proporciona
        let filteredProducts = products.docs;
        if (category) {
          filteredProducts = filteredProducts.filter(product => product.category === category);
        }

        // Ordenar los productos
        if (sort) {
            if (sort === 'asc') {
            products.sort((a, b) => a.price - b.price)
            } else if (sort === 'desc') {
            products.sort((a, b) => b.price - a.price)
            }
        }

        //Limite
        if (limit && limit <= products.length) {
            products.splice(limit)
        }

        // Paginación
        let totalPages = products.totalPages
        let startIndex = (page -1) * limit
        let endIndex = startIndex + limit
        let prods = filteredProducts.slice(startIndex, endIndex)

        // Objeto de respuesta
        let response = {
            status: 'success',
            payload: prods,
            totalPages: totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null,
            page: page,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevLink: page > 1 ? `/products?page=${page - 1}&limit=${limit}` : null,
            nextLink: page < totalPages ? `/products?page=${page + 1}&limit=${limit}` : null
        }

        res.sendSuccess(response)
    
    } catch (error) {
        // res.sendServerError({ error: error, message: 'Se produjo un error al obtener los productos.' })
        console.log(error)
    }
}

const getProdById =  async (req, res) => {
    let prodID = req.params.pid
    const prod = await getProductById(prodID)
    if(!prod) return res.send({error:`El producto N° ${prodID} no existe`})
    res.sendSuccess({status: 'success', prod})
}

const updateProduct = async (req, res) => {
    const pid = req.params.pid
    const productUpdate = req.body
    if (!productUpdate  || productUpdate.id) {
        return res.status(400).send({ error: 'Wrong body format' });
    }
    await updateProductById(pid, productUpdate);
    res.sendSuccess({ status: 'success', message: 'product updated' });
}

const deleteProduct = async (req, res) => {
    const pid = req.params.pid
    try {
        const products = await getProducts(page, limit, query, sort)
        const productIndex = products.findIndex(product => product._id == pid);
 
        if (productIndex < 0 ){
            res.status(404).sendClientError({status:'error', error: 'product not found'})
        } else {
            await deleteProductById(pid)
            res.sendSuccess({status: 'success', message: 'product deleted'})
        }
    } catch (error) {
        console.log(error)
    }

}

export {
    addProduct,
    getPaginatedProducts,
    getViewsProducts,
    getProdById,
    updateProduct,
    deleteProduct
}