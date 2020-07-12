const validateProfileInput = require('./../validate/profile');
const isEmpty = require('./../validate/isEmpty');

function validateProfileRequest(req, res, next) {

    let errors = validateProfileInput(req.body);

    if (!isEmpty(errors)) {
        return res.status(400).json({
            'status': 'failed',
            errors: errors
        })
    }

    next();
}

module.exports = validateProfileRequest;