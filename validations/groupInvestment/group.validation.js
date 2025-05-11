const Joi = require('joi');
const { validateBody, validateQuery } = require('../../helper/joiValidations');

const create = Joi.object({
    groupName: Joi.string().min(1).max(30).required(),
    members: Joi.array().items(Joi.string().length(24)).required(),
});


const getAllData = Joi.object({
    status: Joi.string().valid('Active', 'InActive').optional()
})

const update = Joi.object({
    _id: Joi.string().length(24).required(),
    groupName: Joi.string().min(1).max(30).optional(),
    members: Joi.string().optional(),
});

const updateStatus = Joi.object({
    _id: Joi.string().length(24).required(),
    status: Joi.string().valid('Active', 'Inactive', 'Delete')
})



module.exports = {
    create: validateBody(create),
    getAllData: validateQuery(getAllData),
    update: validateBody(update),
    updateStatus: validateBody(updateStatus)
};
