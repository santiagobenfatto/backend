import userModel from "../models/users.model.js";

export default class UsersManager {
    constructor(){
        console.log('Working users with DB')
    }


    getAllUsers = async () => {
        const users = await userModel.find().lean()
        return users
    }
    
    getAllPaginated = async (limit, page) => {
        const users = await userModel.paginate({}, { limit, page, lean: true });
        return users; 
    }

    createNewUser = async (user) => {
        const newUser = await userModel.create(user)
        return newUser
    }

    getUserById = async (id) => {
        const user = await userModel.findOne({_id}).lean()
        return user
    }

    updateUserById = async (id, user) => {
        const updatedUser = await userModel.updateOne({_id}, user)
        return updatedUser
    }

    getUserByEmail = async (email) => {
        const user = await userModel.findOne({ email }).lean();
        return user;
    }

}