import express from 'express';
import productsRouter from './products.routes.js';
import cartsRouter from './cart.routes.js';
import viewsRouter from './views.routes.js'
import sessionRouter from './sessions.routes.js'

const router = express.Router()

router.use('/api/sessions', sessionRouter)
router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)
router.use('/', viewsRouter)

export default router