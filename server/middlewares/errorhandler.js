module.exports = function(err, req, res, next) {
    let error = []
    let status
    let message
    if (err.name == 'SequelizeValidationError') {
        for (let i = 0; i<err.errors.length; i++) {
            error.push(err.errors[i].message)
        }
        message = error.join(', ')
        status = 400
    } else if (err.name == 'Data not found') {
        message = 'Data not found'
        status = 404
    } else if (err.name == 'Invalid email or password') {
        status = 404   
        message = 'Invalid email or password'
        // errors = message
    } else if (err.name == 'Forbidden Access'){
        status = 403
        message = 'Forbidden Access'
    } else if (err.name == 'User has already registered'){
        status = 402
        message = 'User has already registered'
    } else if (err.name == 'No token generated') {
        status = 400
        message = 'No token generated'
    } else {
        status = 500
        message = 'Internal Server Error'
    }

    res.status(status).json(message)

}