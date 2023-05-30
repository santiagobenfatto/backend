import { Router } from "express";
import userModel from '../dao/models/user.model.js'


const router = Router()

router.post('/register', async (req, res) => {
try {
    const { first_name, last_name, email, age, password } = req.body
    const exists = await userModel.findOne({email})
    
    if(exists) return res.status(400).send({status:'error', error: 'User already exists'})
    
    const user = {
        first_name,
        last_name,
        email,
        age,
        password
    }

    await userModel.create(user)
    res.send({status: 'succes', message: 'User registered'})


} catch (error) {
    res.status(500).send({status: 'error', error})
}
})

router.post('/login', async (req, res) => {
    try {
    const { email, password }  = req.body
       
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        req.session.user= {
            name: 'aminCoder',
            email: 'adminCoder@coder.com',
            role: 'admin'
        }
    } else{
    const user = await userModel.findOne({ email, password })

    //Almacenamos en el atributo user de mi session los siguientes atributos
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role: 'user'
    }

    if(!user) return res.status(400).send({status: 'error', error: 'Incorrect credentials'})
    }



    res.send({ status: 'success', message: 'Login success'})
    
    } catch (error) {
        res.status(500).send({status: 'error', error: error})
    }
})

router.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).send({status:' error', error: 'Logout Failed'})
        res.redirect('/')
    })
})


export default router