import { Router } from "express";
import passport from "passport";
import userModel from '../dao/models/user.model.js'
import { createHash } from "../utils.js";


const router = Router()


router.post('/register', passport.authenticate('register', {failureRedirect: 'fail-register'}), async (req, res) => {
    res.send({status: 'succes', message: 'User registered'})
})

router.get('failure-register', async (req, res) => {
    res.send({status: 'error', message: 'Register failed'})
})

router.post('/login', passport.authenticate('login', { failureRedirect: 'fail-login'}), async (req, res) => {
    if(!req.user) return res.status(400).send({status: 'error', error: 'Invalid Credentials'})
      
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
            role: req.user.role
        }
    
      res.send({ status: 'success', message: 'Login success'})
  })


router.get('/fail-login', async (req, res) => {
    res.send({status: 'error', message: 'Login Failed'})
})

router.get('/github', passport.authenticate(
    'github',
    { scope:['user:email'] }
    ),
    async (req, res) => {
    res.send({status: 'success', message: 'user registered'})
})

router.get('/github-callback', passport.authenticate(
    'github',
    { failureRedirect:'/login' }
    ), async (req, res) => {
        req.session.user = req.user
        res.redirect('/')
})

router.post('/reset', async(req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) return res.status(400).send({ status: 'error', error: 'Incomplete values' });

        const user = await userModel.findOne({ email });

        if (!user) return res.status(400).send({ status: 'error', error: 'User not found' });

        user.password = createHash(password);

        await userModel.updateOne({ email }, user);

        res.send({ status: 'success', message: 'Password reset' })
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });   
    }
})

router.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).send({status:' error', error: 'Logout Failed'})
        res.redirect('/')
    })

})


export default router