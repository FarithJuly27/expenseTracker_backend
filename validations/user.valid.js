const Joi = require('joi');
const { validateBody, validateQuery, validateParams } = require('../helper/joiValidations');

const signup = Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    emailId: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});


const login = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
})



module.exports = {
    signup: validateBody(signup),
    login: validateBody(login)
};
