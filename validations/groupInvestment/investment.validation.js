const Joi = require('joi');
const { validateBody, validateQuery } = require('../../helper/joiValidations');

const createMany = Joi.array().items(Joi.object({
    groupId: Joi.string().length(24).required(),
    memberId: Joi.string().length(24).required(),
    amount: Joi.number().required(),
    investmentDate: Joi.date().required(),
    notes: Joi.string()
}));


const getAllData = Joi.object({
    status: Joi.string().valid('Active', 'InActive').optional()
})

const update = Joi.object({
    _id: Joi.string().length(24).required(),
    groupId: Joi.string().length(24).optional(),
    userId: Joi.string().length(24).optional(),
    investmentType: Joi.string().optional(),
    amount: Joi.number().optional(),
    investmentDate: Joi.date().optional(),
    notes: Joi.string()

});

const updateStatus = Joi.object({
    _id: Joi.string().length(24).required(),
    status: Joi.string().valid('Active', 'Inactive', 'Delete')
})



module.exports = {
    createMany: validateBody(createMany),
    getAllData: validateQuery(getAllData),
    update: validateBody(update),
    updateStatus: validateBody(updateStatus)
};
