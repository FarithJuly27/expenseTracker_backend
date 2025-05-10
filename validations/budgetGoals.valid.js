const Joi = require('joi');
const { validateBody, validateQuery } = require('../helper/joiValidations');

const addBudget = Joi.object({
    budgetAmount: Joi.number().required(),
    month: Joi.string()
        .valid(
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ).insensitive().required(),
    year: Joi.number().integer().min(1900).max(2100).required()
});


module.exports = {
    addBudget: validateBody(addBudget)
}