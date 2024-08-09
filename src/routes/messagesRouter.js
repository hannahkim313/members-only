const { Router } = require('express');
const messagesController = require('../controllers/messagesController');

const messagesRouter = Router();

messagesRouter.get('/', messagesController.messagesListGet);
messagesRouter.get('/create', messagesController.messagesCreateGet);
messagesRouter.post('/create', messagesController.messagesCreateGet);
messagesRouter.get('/delete/:id', messagesController.messagesDeleteGet);

module.exports = messagesRouter;
