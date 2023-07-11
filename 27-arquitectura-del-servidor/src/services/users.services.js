import { USERSDAO } from '../dao/index.js'


const getAllUsers = async () => {
    const users = await USERSDAO.getAll()
    return users
}

const getAllPaginated = async () => {
    const users = await USERSDAO.usersPaginated()
    return users
}

const createUser = async (user) => {
    const newUser = await USERSDAO.createNewUser(user)
    return newUser
}

const getUserById = async (id) => {
    const user = await USERSDAO.getUserById(id)
    return user
}

const updateUser = async (id, user) => {
    const selectedUser = await USERSDAO.updateUserById(id, user)
    return selectedUser
}

const getUserByEmail = async (email) => {
    const user = await USERSDAO.getUserByEmail(email)
    return user
}


export {
    getAllUsers,
    getAllPaginated,
    createUser,
    getUserById,
    updateUser,
    getUserByEmail
}