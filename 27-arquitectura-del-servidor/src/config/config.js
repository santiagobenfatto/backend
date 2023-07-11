import dotenv from 'dotenv'

dotenv.config()

export default {
    presistence: process.env.PERSISTENCE,
    mongoURL: process.env.MONGO_URL,
    adminEMAIL: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    privateKey: process.env.PRIVATE_KEY
}