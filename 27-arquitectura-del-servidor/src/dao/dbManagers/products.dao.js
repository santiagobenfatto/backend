import productModel from '../models/products.model.js'


export default class ProductsManager {
    constructor(){
        console.log('Working products with DB')
    }

    getProducts = async (page, limit, query, sort) => {
        const options = {
			page: Number(page),
			limit: Number(limit),
			query: query,
			sort: sort,
			lean: true
			};
		
			if (query) {
				options.query = { tipo: query };
			}
		
			if (sort) {
				if (sort === 'asc') {
				options.sort = { price: 1 };
				} else if (sort === 'desc') {
				options.sort = { price: -1 };
				}
			}
      
          return await productModel.paginate({}, options);
    }

    getAllProducts = async () => {
        return await productModel.find()
    }
    findById = async (id) => {
        return await productModel.findOne({_id: id})
    }

    addProduct = async (product) => {
        return await productModel.create(product)
    }

    updateProduct = async (id, product) => {
        return await productModel.updateOne({_id: id}, product)
    }

    deleteProduct = async (id) => {
        return await productModel.deleteOne({_id: id})
        
    }
}

