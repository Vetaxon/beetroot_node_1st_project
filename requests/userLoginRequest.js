const validateLoginInput = require('./../validate/login');
const isEmpty = require('./../validate/isEmpty');
const usersRepository = require('./../models/repository/userRepository');
const {check} = require('./../services/authentication');

async function validateLoginRequest(req, res, next) {
    let errors = validateLoginInput(req.body);

    if (!isEmpty(errors)) {
        return res.status(400).json({
            'status': 'failed',
            errors: errors
        })
    }

    const user = await usersRepository.getModel().findOne({email: req.body.email});

    if (!user) {
        return res.status(400).json({
            status: 'failed',
            errors: {
                email: 'email not exists'
            }
        })
    }

    if (!(await check(req.body.password, user.password))) {
        return res.json({
            status: 'failed',
            errors: {
                password: 'incorrect email/password combination'
            }
        })
    }

    req.user = user;
    next();
}

module.exports = validateLoginRequest;