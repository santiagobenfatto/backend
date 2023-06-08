import passport from 'passport';
import local from 'passport-local'
import userModel from '../dao/models/user.model.js';
import GitHubStrategy from 'passport-github2'
import { createHash, isValidPassword } from '../utils.js';


const LocalStrategy = local.Strategy


const initializePassport = () => {
    
    //Local Strategy
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const {first_name, last_name, age, email } = req.body
        try {
            const user = await userModel.findOne({ email: username} )
    
        if(user) {
            done(null, false)
        }

        const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password)
        }
    
        const result = await userModel.create(newUser)
        return done(null, result)

        } catch (error) {
            return done(`Error al obtener el usuario: ${error}`)
        }
    }))


    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        
        try {
            const user = await userModel.findOne({ email: username })
            
            if(!user) {
                return done(null, false)
            }

            if(!isValidPassword(user, password)) return done(null, false)

            return done(null, user)
            //Si todo fue bien passport setea req.user

        } catch (error) {
            return done(`Error al obtener el usuario: ${error}`)
        }
    })
    )

    //Github Strategy
    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.f9ee312c810856d0',
        clientSecret: '8dd44c949b8e3f6d7fba3c89a5a6a5c095cc3ce1',
        callbackURL:'http://localhost:8080/api/sessions/github-callback',
        scope:['user:email']
    }, async(accesToken, refeshToken, profile, done) => {
        try {
            const email = profile.emails[0].value
            const user = await userModel.findOne({email})
            if(!user) {
                const newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    email,
                    password: ''
                }
                const result = await userModel.create(newUser)
                done(null, result)
            } else {
                done(null, user)
            }

        } catch (error) {
            return done(error)
        }
    }))


    passport.serializeUser((user, done) => {
        done(null, user._id)
       })

    passport.deserializeUser( async (id, done) =>{
        const user = await userModel.findById(id)
        done(null, user)
    })
}


export default initializePassport