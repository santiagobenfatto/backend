import express from 'express';
import productsRouter from './products.routes.js';
import cartsRouter from './cart.routes.js';

const router = express.Router()

router.use('/products', productsRouter)
router.use('/carts', cartsRouter)

export default router