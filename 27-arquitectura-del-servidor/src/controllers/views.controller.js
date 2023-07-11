import { CARTSDAO } from '../dao/index.js'
import { getViewsProducts } from './products.controller.js'



//Register
const registerView = (req, res) => {
    //Renderiza vista Register:
    res.render('register')
}

const loginView = (req, res) => {
    //Renderiza vista Login:
    res.render('login')
}

const resetView = (req, res) => {
    res.render('reset');
}

// const productsView1 = async (req,res) => {
//     const { page = 1, limit = 3, query, sort} = req.query
//     try {
//         const options = {
//             limit: Number(limit),
//             page: Number(page),
//             lean: true
//         };
    
//         if (query) {
//             options.query = { tipo: query }
//         }
    
//         if (sort) {
//             if (sort === 'asc') {
//                 options.sort = { price: 1 }
//             } else if (sort === 'desc') {
//                 options.sort = { price: -1 }
//             }
//         }
    
//         const {
//             docs,
//             totalPages,
//             hasPrevPage,
//             hasNextPage,
//             nextPage,
//             prevPage,
     
//         } = await productModel.paginate({}, options)
        
//         const products = docs
    
//         res.render('products', {
//             products,
//             totalPages,
//             hasPrevPage,
//             hasNextPage,
//             nextPage,
//             prevPage
//         })
//     } catch (error) {
//         console.log(error)
//     }  
// }


const productsView = async (req, res) => {
    try {
      let page = req.query.page || 1
      let limit = req.query.limit || 10
      let category = req.query.category
      let sort = req.query.sort
      
      const products = await getViewsProducts(page, limit, category, sort)
      
      //console.log(products)
      
      res.render('products', {
		user: req.user,
        products: products.payload,
        totalPages: products.totalPages,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        nextPage: products.nextPage,
        prevPage: products.prevPage,
      });
    } catch (error) {
      console.log(error);
    }
  };
  

const cartView =  async (req,res) => {
    const cid = req.params.cid
    try {
        const cart = await CARTSDAO({ _id: cid }).populate('products.product').lean().exec()
        res.render('carts', { cart: cart })
    } catch (error) {
        console.log(error)
    }
}

export {
    loginView,
    resetView,
    registerView,
    productsView,
    cartView
}