import { fileURLToPath } from 'url'
import { dirname } from 'path'
import config from './config/config.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PRIVATE_KEY = config.privateKey

const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' })
    return token
};

export {
    __dirname,
    createHash,
    isValidPassword,
    generateToken
}