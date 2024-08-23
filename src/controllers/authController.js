const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const validateSignUp = require('../validators/signUpValidators');
const { createUser } = require('../db/queries');

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

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await createUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: hashedPassword,
      membershipStatus: 'guest',
    });

    res.redirect('/auth/login');
  }),
];

exports.authLoginGet = (req, res) => {
  res.render('./views/login', {
    title: 'Welcome to Members Only | Log in',
    error: req.flash('error'),
  });
};

exports.authLogoutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect('/');
  });
};
