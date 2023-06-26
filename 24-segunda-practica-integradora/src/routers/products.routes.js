import Router from './router.routes.js'
import ProductsManager from '../dao/dbManagers/products.manager.js';



const productManager = new ProductsManager()

/* 
    ===== FALTA CUSTOMIZAR ERRORES Y RESPUESTAS =====
    ===== TRY CATCHEAR TODO =====
*/


export default class ProductsRouter extends Router {
  init() {
    this.post('/', async (req,res) => {
        const products = await productManager.getProducts()    
        const product = req.body
    
        const foundCode = products.find(prod => prod.code === product.code)
        if(foundCode){
            return res.send({error:`product code ${product.code} already exists`})
        }
    
        if (!product.status){
            product.status = true
        }
        if(!product.title || !product.description || !product.code || !product.price || !product.category || !product.stock) {
            return res.status(400).send({error: 'incomplete values'})
        }
        const result = await productManager.addProduct(product)
        res.send({status:'success', result})
    })
    
    this.get('/', async (req, res) => {
        try {
				const products = await productManager.getProducts()
			let limit = Number(req.query.limit)
			let category = req.query.category
			let sort = req.query.sort
		
			// Filtrar por categoría si se proporciona
			if (category) {
				products = products.filter(product => product.category === category)
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
			let page = Number(req.query.page) || 1
			let pageSize = Number(req.query.pageSize) || 10
			let totalPages = Math.ceil(products.length / pageSize)
			let startIndex = (page - 1) * pageSize
			let endIndex = startIndex + pageSize
			let prods = products.slice(startIndex, endIndex)
      
          // Construir el objeto de respuesta
          let response = {
            status: 'success',
            payload: prods,
            totalPages: totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null,
            page: page,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevLink: page > 1 ? `/products?page=${page - 1}&pageSize=${pageSize}` : null,
            nextLink: page < totalPages ? `/products?page=${page + 1}&pageSize=${pageSize}` : null
          }
      
          res.json(response)
        } catch (error) {
          res.send({ error: error, message: 'Se produjo un error al obtener los productos.' })
        }
      })
    
    this.get('/:pid', async (req, res) => {
        let prodID = req.params.pid
        const prod = await productManager.getProductById(prodID)
        if(!prod) return res.send({error:`El producto N° ${prodID} no existe`})
        res.send({status: 'success', prod})
    })
    
    this.put('/:pid', async (req, res) => {
        const pid = req.params.pid
        const productUpdate = req.body
        if (!productUpdate  || productUpdate.id) {
          return res.status(400).send({ error: 'Wrong body format' });
        }
        await productManager.updateProduct(pid, productUpdate);
        res.send({ status: 'success', message: 'product updated' });
    });
    
    this.delete('/:pid', async (req, res) => {
        const pid = req.params.pid
        try {
            const products = await productManager.getProducts()
            const productIndex = products.findIndex(product => product._id == pid);
            if (productIndex < 0 ){
                res.status(404).send({status:'error', error: 'product not found'})
            } else {
                await productManager.deleteProduct(pid)
                res.send({status: 'success', message: 'product deleted'})
            }
        } catch (error) {
            console.log(error)
        }
    
    })
  }
}