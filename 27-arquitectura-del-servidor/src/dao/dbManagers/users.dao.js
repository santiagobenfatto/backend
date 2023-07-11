import userModel from "../models/users.model.js";

export default class UsersManager {
    constructor(){
        console.log('Working users with DB')
    }

    getAll = async () => {
        return await userModel.find().lean()
    }
    
    usersPaginated = async (limit, page) => {
        return await userModel.paginate({}, { limit, page, lean: true })
    }

    createNewUser = async (user) => {
        return await userModel.create(user)
    }

    getUserById = async (_id) => {
        return await userModel.findOne({_id}).lean()
    }

    updateUserById = async (id, user) => {
        return await userModel.updateOne({_id}, user)
    }

    getUserByEmail = async (email) => {
       return await userModel.findOne({ email }).lean()
    }
}