const express = require('express');
const passport = require('passport');
const upload = require('../middleware/upload');
const controller = require('../controllers/category');
const router = express.Router();

const authenticate = passport.authenticate('jwt', {session: false});

router.get('/', authenticate, controller.getAll);
router.get('/:id', authenticate, controller.getById);
router.delete('/:id', authenticate, controller.remove);
router.post('/', authenticate, upload.single('image'), controller.create);
router.patch('/:id', authenticate, upload.single('image'), controller.update);

module.exports = router;
