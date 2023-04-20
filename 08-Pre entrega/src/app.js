import express from 'express';
import routers from './routers/app.routers.js'


const app = express()
const PORT = process.env.PORT || 8080


app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api', routers)


const connectedServer = app.listen(PORT, () => { console.log(`Servidor activo y esuchando en el puerto ${PORT}`) })

connectedServer.on('error', (error) => { console.error('Error: ', error) })
  
