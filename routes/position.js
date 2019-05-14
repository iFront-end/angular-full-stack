const express = require('express');
const passport = require('passport');
const controller = require('../controllers/position');
const router = express.Router();

const authenticate = passport.authenticate('jwt', {session: false});

router.get('/:categoryId', authenticate, controller.getByCategoryId);
router.post('/', authenticate, controller.create);
router.patch('/:id', authenticate, controller.update);
router.delete('/:id', authenticate, controller.remove);

module.exports = router;
