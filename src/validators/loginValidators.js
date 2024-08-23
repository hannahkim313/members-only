const { body } = require('express-validator');
const {
  isValidUsername,
  doesPasswordMatchUsername,
} = require('../validators/customValidators');

const validateLogin = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required.')
    .custom(isValidUsername),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required.')
    .custom(doesPasswordMatchUsername),
];

module.exports = validateLogin;
