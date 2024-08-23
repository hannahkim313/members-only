const { body } = require('express-validator');
const { isValidPasscode } = require('../validators/customValidators');

const validateMembership = [
  body('passcode')
    .trim()
    .notEmpty()
    .withMessage('Passcode is required.')
    .custom(isValidPasscode)
    .withMessage('Incorrect passcode.'),
];

module.exports = validateMembership;
