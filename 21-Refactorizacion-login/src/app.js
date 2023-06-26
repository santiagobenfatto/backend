import express from 'express'
import handlebars from 'express-handlebars'
import session from 'express-session'
import __dirname from './utils.js'
import routerApp from './router/app.routes.js'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import passport from 'passport'
import initializePassport from './config/passport.config.js'


const app = express()
const PORT = process.env.PORT || 8080


try {
    await mongoose.connect('mongodb+srv://santiagobenfatto:u4k1KjqWMp3XTJpu@cluster01.jjqe14l.mongodb.net/desafioLogin-21?retryWrites=true&w=majority')
} catch (error) {
    console.log(error)
}

// Sessions usando Mongo Storage
app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(), 
        ttl: 3600
    }),
    secret: 'CoderSessionsPass',
    resave: true,
    saveUninitialized: true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/', routerApp)

app.listen(PORT, () => {
    console.log(`Server is active and running on port ${PORT}`)
})