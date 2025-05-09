const Joi = require('joi');
const { validateBody, validateQuery } = require('../helper/joiValidations');

const create = Joi.object({
    name: Joi.string().min(1).max(30).required(),
    icon: Joi.string().optional(),
    color: Joi.string().min(6).optional()
});


const getAllData = Joi.object({
    status: Joi.string().valid('Active', 'InActive').optional()
})

const update = Joi.object({
    _id: Joi.string().length(24).required(),
    name: Joi.string().min(1).max(30).optional(),
    icon: Joi.string().optional(),
    color: Joi.string().min(6).optional()
});



module.exports = {
    create: validateBody(create),
    getAllData: validateQuery(getAllData),
    update: validateBody(update)
};
