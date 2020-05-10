const jwt = require('jsonwebtoken')
const secret_key = process.env.SECRET_KEY

function generateToken(user){
    let token = jwt.sign({
        id:user.id, email:user.email
    }, secret_key)
    return token
}

function verifyToken(token){
    let decoded = jwt.verify(token, secret_key)
    return decoded
}

module.exports = {
    generateToken,
    verifyToken
}
