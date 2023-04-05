import express from 'express';
import ProductManager from './ProductManager.js';


const app = express()
const PORT = process.env.PORT || 8080

const manager = new ProductManager('./products.json')

app.use(express.urlencoded({extended: true}))


app.get('/products', async (req, res) => {

    const productos = await manager.getProducts()

    res.send(productos)
})


app.listen(PORT, ()=>{console.log(`Servidor activo y esuchando en el puerto ${PORT}`)})