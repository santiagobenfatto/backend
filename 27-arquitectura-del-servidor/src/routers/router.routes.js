import { Router as expressRouter } from 'express'
import jwt from 'jsonwebtoken'
import { passportStrategiesEnum } from '../config/enums.js'
import passport from 'passport'

export default class Router {
    constructor(){
        this.router = expressRouter()
        this.init()
    }

    getRouter(){
        return this.router
    }
    
    init(){}
    
    //Methods
    get(path, policies, passportStrategy, ...callbacks){
        this.router.get(
            path,
            this.applyCustomPassportCall(passportStrategy),
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks)
        )
    }

    post(path, policies, passportStrategy, ...callbacks){
        this.router.post(
            path,
            this.applyCustomPassportCall(passportStrategy),
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks)
        )
    }

    put(path, policies, passportStrategy, ...callbacks){
        this.router.put(
            path,
            this.applyCustomPassportCall(passportStrategy),
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks)
        )
    }

    patch(path, policies, passportStrategy, ...callbacks){
        this.router.patch(
            path,
            this.applyCustomPassportCall(passportStrategy),
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks)
        )
    }
    
    delete(path, policies, passportStrategy, ...callbacks){
        this.router.delete(
            path,
            this.applyCustomPassportCall(passportStrategy),
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks)
        )
    }

    //Passport Call
    applyCustomPassportCall = (strategy) => (req, res, next) => {
        if (strategy === passportStrategiesEnum.JWT) {
            passport.authenticate(strategy, function (err, user, info) {
                if (err) return next(err)
                req.user = user
                if (!user) {
                    return res.status(401).send({
                    Error: info.messages ? info.messages : info.toString()
                })
                }
                next();
            })(req, res, next);
        } else {
            next();
        }
    }

    //Policies
    handlePolicies = (policies) => (req, res, next) => {
        if(policies[0] === 'PUBLIC') return next()
        
        const user = req.user
        console.log(user)
        
        if(!policies.includes(user.role.toUpperCase())){
            return res.status(403).json({ message: 'Forbidden'})
        }
        next()
    }

    //Responses
    generateCustomResponse = (req, res, next) => {
        res.sendSuccess = (data) => {
            res.status(200).json({ data });
        }
        res.sendServerError = (error) => {
            res.status(500).json({ error });
        }
        res.sendClientError = (error) => {
            res.status(400).json({ error })
        }
        next()
    }

    applyCallbacks(callbacks){
        return callbacks.map((callback) => async(...params) => {
            try {
                await callback.apply(this, params)//req, res, next
            } catch (error) {
                params[1].status(500).json({ error: error.message })
            }

        })
    }

}