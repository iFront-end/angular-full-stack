const express = require('express');
const passport = require('passport');
const controller = require('../controllers/order');
const router = express.Router();

const authenticate = passport.authenticate('jwt', {session: false});

router.get('/', authenticate, controller.getAll);
router.post('/', authenticate, controller.create);

module.exports = router;
