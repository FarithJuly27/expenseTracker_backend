const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const response = require('../helper/response')
const SECRET_KEY = process.env.SECRET_KEY


const checkAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            return response.invalidTokenError(res, 'Invalid Token')
        }
        const decodeMessage = await jwt.verify(token, SECRET_KEY)
        const { _id } = decodeMessage
        const user = await userModel.findById(_id)
        if (!user) {
            return response.errorResponse(res, 'User Not Found')
        }
        req.userId = user._id
        next()
    } catch (error) {
        response.catchError(res, 'Catch Error In Authentication', error.message)
    }
}

module.exports = {
    checkAuth
}