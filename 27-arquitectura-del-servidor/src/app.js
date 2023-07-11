import express from 'express';
import { __dirname } from './utils.js'
import './dao/dbManagers/dbConfig.js'
import handlebars from 'express-handlebars'
import routers from './routers/app.routes.js'
import cookieParser from 'cookie-parser'
import passport from 'passport';
import initializePassport from './config/passport.config.js'
//import productModel from './dao/models/products.model.js';


const app = express()
const PORT = process.env.PORT || 8080

initializePassport()
app.use(passport.initialize())

app.use(cookieParser())

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(`${__dirname}/public`))


app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/', routers)

app.listen(PORT, () => {console.log(`Server is active and running on port ${PORT}`)})

