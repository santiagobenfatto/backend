import passport from 'passport'
import jwt from 'passport-jwt'

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = () => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'ClavePrivada'
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload.user)
            //passport va a setear el req.user = {}
            //con la info del usuario
        } catch (error) {
            return done(error)
        }
    }))
}

//Definimos la funcion cookieExtractor() ya que jwt no posee método propio para recibir las cookies
const cookieExtractor = req => {
    let token = null
    if(req && req.cookies) {
        token = req.cookies['cookieToken']
    }
    return token
}

export default initializePassport