const { Router } = require('express');
const membersController = require('../controllers/membersController');

const membersRouter = Router();

membersRouter.get('/membership', membersController.memberMembershipGet);
membersRouter.post('/membership', membersController.memberMembershipGet);

module.exports = membersRouter;
