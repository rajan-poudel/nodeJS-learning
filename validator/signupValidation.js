const Joi = require('joi');
function validateSignupData(userData) {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });

    const { error } = schema.validate(userData);

    if (error) {
        return error.details[0].message;
    }

    return null;
}

module.exports = validateSignupData;


