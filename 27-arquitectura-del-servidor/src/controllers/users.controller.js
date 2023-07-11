import { 
    getUserByEmail,
    createUser
} from '../services/users.services.js'
import { createHash, generateToken, isValidPassword } from '../utils.js'

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await getUserByEmail(email)
        
        if (!user) return res.sendClientError('Incorrect Credentials')
        
        const comparePass = isValidPassword(user, password)
        console.log(`The comparePass is: ${comparePass}`)
        
        if(!comparePass) {
            return res.sendClientError('Incorrect Credentials')
        }
        
        const accessToken = generateToken(user)
        
        res.cookie(
            'cookieToken', accessToken, {maxAge:60 *60*1000, httpOnly:true}
        ).sendSuccess({message: 'success'})

        // console.log(`The access token is: ${accessToken}`)
        // return res.sendSuccess({ accessToken })
    } catch (error) {
        console.log(error)
    }
}

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password, role='PUBLIC' } = req.body
        
        if(!first_name || !last_name || !role || !email || !password) {
            return res.sendClientError('Incomplete Values')
        }
        const exists = await getUserByEmail(email)

        if(exists) return res.sendClientError('User Already Exists')

        const hashedPassword = createHash(password)

        const newUser = {
            ...req.body
        }
        
        newUser.password = hashedPassword

        const result = await createUser(newUser)

        res.sendSuccess(result)
    } catch (error) {
        res.sendServerError(`Error: ${error.message}`)
    }
}

export {
    login,
    register
}