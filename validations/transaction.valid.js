const Joi = require('joi');
const { validateBody, validateQuery } = require('../helper/joiValidations');
const { search } = require('../routes/transaction.routes');

const create = Joi.object({
    amount: Joi.number().required(),
    description: Joi.string().max(500).optional(),
    categoryId: Joi.string().length(24).required(),
    type: Joi.string().valid('Expense', 'Income').required(),
    transactionDate: Joi.date().optional()
});

const getAllData = Joi.object({
    categoryId: Joi.string().length(24).optional(),
    searchFilter: Joi.string().optional(),
    dateFilter: Joi.string().optional()
})

const update = Joi.object({
    _id: Joi.string().length(24).required(),
    amount: Joi.number().required(),
    description: Joi.string().max(500).optional(),
    categoryId: Joi.string().length(24).required(),
    transactionDate: Joi.date().optional()
});

const transactionHistory = Joi.object({
    dateFilter: Joi.string().valid('today', 'yesterday', 'thisWeek', 'thisMonth', 'thisYear')
})

const topCategories = Joi.object({
    dateFilter: Joi.string().valid('today', 'yesterday', 'thisWeek', 'thisMonth', 'thisYear')
})



module.exports = {
    create: validateBody(create),
    getAllData: validateQuery(getAllData),
    transactionHistory: validateQuery(transactionHistory),
    topCategories: validateQuery(topCategories),
    update: validateBody(update)
};
