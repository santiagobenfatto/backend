import { Router } from 'express';
import ProductsRouter from './products.routes.js';
import CartsRouter from './cart.routes.js';
import ViewsRouter from './views.routes.js'
import UsersRouter from './user.routes.js';

const router = Router()


/*
    ===== INSTANCIAR CLASES =====
    ===== Products, Carts, Users =====
    ===== Views con clases. =====
*/

const productsRouter = new ProductsRouter()
const cartsRouter = new CartsRouter()
const usersRouter = new UsersRouter()
const viewsRouter = new ViewsRouter()


router.use('/', viewsRouter.getRouter())
router.use('/api/products', productsRouter.getRouter())
router.use('/api/carts', cartsRouter.getRouter())
router.use('/', usersRouter.getRouter())

export default router