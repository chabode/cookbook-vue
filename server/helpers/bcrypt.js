const bcrypt = require('bcryptjs')

function generatePassword(value){
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(value, salt)
    return hash
}

function comparePassword(value, hash){
    return bcrypt.compareSync(value, hash)
}

module.exports = {
    generatePassword,
    comparePassword
}