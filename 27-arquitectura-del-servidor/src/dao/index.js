import mongoCartsManager from './dbManagers/carts.dao.js'
import mongoProductsManager from './dbManagers/products.dao.js'
import mongoUsersManager from './dbManagers/users.dao.js'
//import config from '../config/config.js'


//const persistence = config.presistence

const mongoCarts = new mongoCartsManager()
const mongoProducts = new mongoProductsManager()
const mongoUsers = new mongoUsersManager()



//export const CARTSDAO = persistence === 'MONGO' ? mongoCarts : memoryCarts
export const CARTSDAO = mongoCarts
export const PRODUCTSDAO = mongoProducts
export const USERSDAO = mongoUsers
