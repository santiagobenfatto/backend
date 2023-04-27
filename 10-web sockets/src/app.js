import express from 'express'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import routers from './routers/app.router.js'

const app = express()
const PORT = process.env.PORT || 8080


app.use(express.static(`${__dirname}/public`))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/', routers)

const server = app.listen(PORT, () => {console.log(`Server is active and running on port ${PORT}`)})

const io = new Server(server)

io.on('connection', socket => {
    console.log("New Client conected")
})
app.set('socketio', io);
