const { Router } = require('express');
const membersController = require('../controllers/membersController');

const membersRouter = Router();

membersRouter.get('/membership', membersController.memberMembershipGet);
membersRouter.post('/membership', membersController.memberMembershipPost);

module.exports = membersRouter;
