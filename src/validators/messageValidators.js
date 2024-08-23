const { body } = require('express-validator');

const validateMessage = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required.')
    .isLength({ min: 1, max: 20 })
    .withMessage('Title must be between 1 and 20 characters.')
    .matches(/^[a-zA-Z0-9.,!?;:'"-(){}[\]/*\s]*$/)
    .withMessage(
      'Title must only contain letters, numbers, and punctuation marks.',
    ),
  body('text')
    .trim()
    .notEmpty()
    .withMessage('Text is required.')
    .isLength({ min: 1, max: 250 })
    .withMessage('Text must be between 1 and 250 characters.')
    .matches(/^[a-zA-Z0-9.,!?;:'"-(){}[\]/*\s]*$/)
    .withMessage(
      'Text must only contain letters, numbers, and punctuation marks.',
    ),
];

module.exports = validateMessage;
