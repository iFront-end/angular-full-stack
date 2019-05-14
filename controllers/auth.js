const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res) => {
    const person = await User.findOne({email: req.body.email});

    if (person) {
        const passwordResult = bcrypt.compareSync(req.body.password, person.password);

        if (passwordResult) {
            const token = jwt.sign({
                email: person.email,
                userId: person._id
            }, keys.jwt, {expiresIn: 3600});

            res.status(200).json({token: `Bearer ${token}`})
        } else {
            res.status(401).json({
                message: 'Пароли не совпадают. Попробуйте снова.'
            })
        }
    } else {
        res.status(404).json({
            message: 'Такой пользователь не найден. Попробуйте другой.'
        })
    }
}

module.exports.register = async (req, res) => {
    const person = await User.findOne({email: req.body.email});

    if (person) {
        res.status(409).json({
            message: 'Такой email уже занят. Попробуйте другой.'
        })
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch(e) {
            errorHandler(res, e);
        }
    }
}
