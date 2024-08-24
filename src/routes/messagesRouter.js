const { Router } = require('express');
const messagesController = require('../controllers/messagesController');

const messagesRouter = Router();

messagesRouter.get('/create', messagesController.messagesCreateGet);
messagesRouter.post('/create', messagesController.messagesCreatePost);
messagesRouter.get('/delete/:id', messagesController.messagesDeleteGet);
messagesRouter.post('/delete/:id', messagesController.messagesDeletePost);

module.exports = messagesRouter;
