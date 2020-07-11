const validateRegisterInput = require('./../validate/register');
const isEmpty = require('./../validate/isEmpty');
const userRepository = require('./../models/repository/userRepository');

async function validateRegisterRequest(req, res, next) {
    let errors = validateRegisterInput(req.body);

    if (!isEmpty(errors)) {
        return res.status(400).json({
            'status': 'failed',
            errors: errors
        })
    }

    const user = await userRepository.getModel().findOne({email: req.body.email});

    if (user) {
        return res.json({
            status: 'failed',
            errors: {
                email: 'email already exists'
            }
        })
    }

    next();
}

module.exports = validateRegisterRequest;