const { Router } = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const authRouter = Router();

authRouter.get('/sign-up', authController.authSignUpGet);
authRouter.post('/sign-up', authController.authSignUpPost);
authRouter.get('/login', authController.authLoginGet);
authRouter.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
  }),
);
authRouter.get('/logout', authController.authLogoutGet);

module.exports = authRouter;
