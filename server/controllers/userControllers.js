const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')
const CLIENT_ID = "911577258079-4tvf7c4pn7svpb29vu0b91v5juuoj0io.apps.googleusercontent.com"
const client = new OAuth2Client(CLIENT_ID)

class UserController {
    static register(req,res,next){
        const {email, password} = req.body
        User.findOne({
            where: {email}
        })
        .then(user => {
            if(user){
                next({msg:'User has already registered'})
            }
            return User.create({
                email, password
            })
        })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req,res,next){
        const {email, password} = req.body
        User.findOne({
            where : {email}
        })
        .then(user => {
            if(!user || !comparePassword(password, user.password)){
                next({msg:'Invalid Email or Password'})
            }
            return user
        })
        .then(user => {
            const access_token = generateToken(user)
            const email = user.email
            res.status(200).json({access_token, email})
        })
        .catch(err => {
            next(err)
        })
    }

    static googleSignIn(req, res, next){
        const {id_token} = req.body
        let currentEmail
        client.verifyIdToken({
            idToken: id_token,
            audience: CLIENT_ID
        })
        .then(ticket => {
            const payload = ticket.getPayload()
            currentEmail = payload['email']
            return User.findOne({
                where: { email:currentEmail }
            })
        })
        .then(user => {
            if(user){
                const access_token = generateToken(user)
                const email = user.email
                res.status(200).json({access_token, email})
            } else {
                return User.create({
                    email: currentEmail,
                    password: 'fromGoogleSignIn'
                })
            }
        })
        .then(newUser => {
            const access_token = generateToken(newUser)
            const email = newUser.email
            res.status(200).json({access_token, email})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController