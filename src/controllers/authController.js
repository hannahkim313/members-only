const { validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const validateSignUp = require('../validators/signUpValidators');

exports.authSignUpGet = asyncHandler(async (req, res) => {
  res.render('./views/signUp', {
    title: 'Welcome to Members Only | Sign up',
    errors: [],
    user: {},
  });
});

exports.authSignUpPost = [
  validateSignUp,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const errorMessages = errors.array().map((err) => err.msg);

    if (!errors.isEmpty()) {
      if (errorMessages.includes('DB_QUERY_ERROR')) {
        return res.status(500).send('Internal Server Error');
      }

      return res.status(400).render('./views/signUp', {
        title: 'Welcome to Members Only | Sign up',
        errors: errors.array(),
        user: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          username: req.body.username,
          password: req.body.password,
          confirmPassword: req.body.confirmPassword,
        },
      });
    }
    // TODO: insert values into db (use bcrypt for password)
  }),
];

exports.authLoginGet = (req, res) => {
  res.send('not implemented yet');
};

exports.authLoginPost = (req, res) => {
  res.send('not implemented yet');
};
