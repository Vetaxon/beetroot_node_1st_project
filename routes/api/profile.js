const express = require('express');
const passport = require('passport');
const router = express.Router();

const validateProfileRequest = require('./../../requests/profileRequest');
const profileController = require('./../../controllers/api/profileController');

router.get(
    '/auth',
    passport.authenticate('jwt', { session: false }),
    profileController.getForAuth
);

router.post(
    '/',
    [passport.authenticate('jwt', { session: false }), validateProfileRequest],
    profileController.store
);

router.get(
    '/handle/:handle',
    passport.authenticate('jwt', { session: false }),
    profileController.getByHandle
);

router.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    profileController.getAll
);

module.exports = router;