import Router from './router.routes.js'
import { passportStrategiesEnum } from '../config/enums.js'
import { 
    addProduct,
    getPaginatedProducts,
    getProdById,
    updateProduct,
    deleteProduct
} from '../controllers/products.controller.js'

export default class ProductsRouter extends Router {
  init() {
    ///api/products
    this.post('/',['PUBLIC'], passportStrategiesEnum.NOTHING, addProduct)

    this.get('/',['PUBLIC'], passportStrategiesEnum.NOTHING, getPaginatedProducts)
    
    this.get('/:pid',['PUBLIC'], passportStrategiesEnum.NOTHING, getProdById)
    
    this.put('/:pid',['PUBLIC'], passportStrategiesEnum.NOTHING, updateProduct)
    
    this.delete('/:pid',['PUBLIC'], passportStrategiesEnum.NOTHING, deleteProduct)
  }
}