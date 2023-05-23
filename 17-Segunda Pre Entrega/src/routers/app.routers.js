import express from 'express';
import productsRouter from './products.routes.js';
import cartsRouter from './cart.routes.js';
import viewsRouter from './views.routes.js'

const router = express.Router()

router.use('/products', viewsRouter)
router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)

export default router