const Joi = require('joi');

const validateBody = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({ status: false, errors });
        }
        req.body = value;
        next();
    };
};

const validateQuery = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.query, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({ status: false, errors });
        }
        req.query = value;
        next();
    };
};

const validateParams = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.params, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({ status: false, errors });
        }
        req.params = value;
        next();
    };
};

module.exports = {
    validateBody,
    validateQuery,
    validateParams
};
