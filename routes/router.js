const router = require('express').Router();

router.use('/api/users', require('./api/users'));
router.use('/api/profile', require('./api/profile'));
router.use('/api/posts', require('./api/posts'));

module.exports = router;