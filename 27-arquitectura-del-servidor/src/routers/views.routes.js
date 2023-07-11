import Router from './router.routes.js'
import { passportStrategiesEnum } from '../config/enums.js'
import {
    loginView,
    resetView,
    registerView,
    productsView,
    cartView
} from '../controllers/views.controller.js'



export default class ViewsRouter extends Router{
    init(){
        this.get('/', ['USER'], passportStrategiesEnum.JWT, productsView)
        this.get('/register', ['PUBLIC'], passportStrategiesEnum.NOTHING, registerView)
        this.get('/login', ['PUBLIC'], passportStrategiesEnum.NOTHING, loginView)
        this.get('api/cart/:cid', ['PRIVATE'], passportStrategiesEnum.NOTHING, cartView)
        this.get('/reset', ['PUBLIC'], passportStrategiesEnum.NOTHING, resetView)
    }
}

