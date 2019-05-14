const express = require('express');
const passport = require('passport');
const controller = require('../controllers/analytics');
const router = express.Router();

const authenticate = passport.authenticate('jwt', {session: false});

router.get('/overview', authenticate, controller.overview);
router.get('/analytics', authenticate, controller.analytics);

module.exports = router;
