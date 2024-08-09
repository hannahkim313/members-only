const { Router } = require('express');
const authController = require('../controllers/authController');

const authRouter = Router();

authRouter.get('/sign-up', authController.authSignUpGet);
authRouter.post('/sign-up', authController.authSignUpPost);
authRouter.get('/login', authController.authLoginGet);
authRouter.post('/login', authController.authLoginPost);

module.exports = authRouter;
