import Router from './router.routes.js'
import productModel from "../dao/models/products.model.js"
import cartModel from "../dao/models/carts.model.js"



export default class ViewsRouter extends Router{
    init(){
        this.get('/products', async (req,res) => {
            const { page = 1, limit = 3, query, sort} = req.query
            try {
                const options = {
                    limit: Number(limit),
                    page: Number(page),
                    lean: true
                };
            
                if (query) {
                    options.query = { tipo: query }
                }
            
                if (sort) {
                    if (sort === 'asc') {
                        options.sort = { price: 1 }
                    } else if (sort === 'desc') {
                        options.sort = { price: -1 }
                    }
                }
            
                const {
                    docs,
                    totalPages,
                    hasPrevPage,
                    hasNextPage,
                    nextPage,
                    prevPage,
             
                } = await productModel.paginate({}, options)
                
                const products = docs
            
                res.render('products', {
                    products,
                    totalPages,
                    hasPrevPage,
                    hasNextPage,
                    nextPage,
                    prevPage
                })
            } catch (error) {
                console.log(error)
            }  
        })
        
        
        this.get('/cart/:cid', async (req,res) => {
            const cid = req.params.cid
            try {
                const cart = await cartModel.findById({ _id: cid }).populate('products.product').lean().exec()
                res.render('carts', { cart: cart })
            } catch (error) {
                console.log(error)
            }
        })

    }
}

