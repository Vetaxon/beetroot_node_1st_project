const router = require('express').Router();
const passport = require('passport');
const validateRegisterRequest = require('./../../requests/userRegisterRequest');
const validateLoginRequest = require('./../../requests/userLoginRequest');

const usersController = require('./../../controllers/api/usersController');

router.post(
    '/register',
    validateRegisterRequest,
    usersController.register
);

router.post(
    '/login',
    validateLoginRequest,
    usersController.login
);

router.get(
    '/auth',
    passport.authenticate('jwt', { session: false }),
    usersController.current
);

module.exports = router;
