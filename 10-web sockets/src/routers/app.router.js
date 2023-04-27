import { Router } from 'express';
import viewsRouter from './views.routes.js'
import productsRouter from './products.routes.js';


/* Importar ambas vistas: 
    -realtimeproducts
    -api/products

*/

const router = Router()

//Ruta de vistas en tiempo real
router.use('/realtimeproducts', viewsRouter)

//Ruta de productos agregados hasta ahora
router.use('/api/products', productsRouter)



export default router