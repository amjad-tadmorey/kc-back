const AppError = require('../utils/appError')

const handleCastErrorDB = err => {
    const message = `invalid ${err.path}: ${err.value}`
    return new AppError(message, 400)
}
const handleDuplicateFieldsDB = err => {
    console.log(err);
    // const value = err.errmsg.match(/(["'])(\\?.)*?\1/)
    const message = `Duplicate field value: ${Object.keys(err.keyValue)[0]} please use another value`
    return new AppError(message, 400)
}
const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid input data ${errors.join('. ')}`
    return new AppError(message, 400)
}

const handleJWTError = () => new AppError('Invalid token please login again !', 401)
const handleTokenExpiredError = () => new AppError('your token has expired please login again !', 401)

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}
const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    } else {
        // console.error('Error', err)
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!',
        })
    }

}


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if (process.env.NODE_ENV === 'development') {

        sendErrorDev(err, res)
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err }
        if (err.name === 'CastError') error = handleCastErrorDB(error)
        if (err.code === 11000) error = handleDuplicateFieldsDB(error)
        if (err.name === 'ValidationError') error = handleValidationErrorDB(error)
        if (err.name === 'JsonWebTokenError') error = handleJWTError()
        if (err.name === 'TokenExpiredError') error = handleTokenExpiredError()
        sendErrorProd(error, res)
    }
}