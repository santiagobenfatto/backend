import RouterClass from './router.routes.js'
import { passportStrategiesEnum } from '../config/enums.js'
import usersManager from '../dao/dbManagers/users.manager.js'
import { createHash, generateToken, isValidPassword } from '../utils.js'

const userManager = new usersManager()


/* 
    ===== FALTA CUSTOMIZAR ERRORES =====
*/

export default class UsersRouter extends RouterClass {
    init() {
        this.post('/login', ['PUBLIC'], passportStrategiesEnum.NOTHING, async (req, res) => {
            try {
                const { email, password } = req.body
            
                const user = await userManager.getUserByEmail(email)

                if (!user) return res.sendClientError('Incorrect Credentials')

                const comparePass = isValidPassword(user, password)

                if(!comparePass) {
                    return res.sendClientError('Incorrect Credentials')
                }

                const accessToken = generateToken(user)

            return res.sendSuccess({ accessToken })
            } catch (error) {
                
            }
        })

        
        this.post('/register', ['PUBLIC'], passportStrategiesEnum.NOTHING, async (req, res) => {
            try {
                const { first_name, last_name, email, age, password, role } = req.body
                
                if(!first_name || !last_name || !role || !email || !password) {
                    return res.sendClientError('Incomplete Values')
                }
        
                const exists = await userManager.getUserByEmail(email)
        
                if(exists) return res.sendClientError('User Already Exists')
        
                const hashedPassword = createHash(password)
        
                const newUser = {
                    ...req.body
                }
                
                newUser.password = hashedPassword
        
                const result = await userManager.createNewUser(newUser)

                res.sendSuccess(result)
            } catch (error) {
                res.sendServerError(`Error: ${error.message}`)
            }
        })
    }
}