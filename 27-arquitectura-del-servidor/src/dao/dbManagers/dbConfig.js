import mongoose from 'mongoose'
import config from '../../config/config.js'

const URI = config.mongoURL

try {
    await mongoose.connect(URI)
    console.log('DB -Clase27Desafio- connected')
} catch (error) {
    console.log(error)
}