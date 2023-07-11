import RouterClass from './router.routes.js'
import { passportStrategiesEnum } from '../config/enums.js'
import { login, register } from '../controllers/users.controller.js'

/* 
    ===== PESTAÑA RESET =====
*/

export default class UsersRouter extends RouterClass {
    init() {
        this.post('/login',['PUBLIC'] , passportStrategiesEnum.NOTHING, login)

        this.post('/register', ['PUBLIC'], passportStrategiesEnum.NOTHING, register)
    }
}