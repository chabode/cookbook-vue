const { verifyToken } = require('../helpers/jwt')

function authentication(req, res, next){
    const { access_token } = req.headers

    if(!access_token){
        throw new Error({name:'Invalid Token'})
    }
    try{
        let decoded = verifyToken(access_token)
        req.userData = decoded
        next()
    }
    catch(err){
        next(err)
    }
}

module.exports = authentication