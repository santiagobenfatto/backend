import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'


const usersCollection = 'users'

const userSchema = new mongoose.Schema({
    
    /* 
first_name:String,
last_name:String,
email:String (único)
age:Number,
password:String(Hash)
cart:Id con referencia a Carts
role:String(default:’user’)

     */

    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    age: Number,
    password: String,
    cart:{
        type: [
            {
                cart: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'carts'
                }
            }
        ],
        default : []
    },
    role: {
        type: String,
        default: 'USER'
    }
})


userSchema.plugin(mongoosePaginate)

userSchema.pre('find', function(){
    this.populate('carts.cart')
})


const userModel = mongoose.model(usersCollection, userSchema)

export default userModel