const asyncHandler = require('express-async-handler');
const validateMessage = require('../validators/messageValidators');
const { validationResult } = require('express-validator');
const db = require('../db/queries');

exports.messagesCreateGet = (req, res) => {
  res.render('./views/messagesCreate', {
    title: 'Members Only | Create a Message',
    errors: [],
    messageTitle: '',
    text: '',
  });
};

exports.messagesCreatePost = [
  validateMessage,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render('./views/messagesCreate', {
        title: 'Members Only | Create a Message',
        errors: errors.array(),
        messageTitle: req.body.title,
        text: req.body.text,
      });
    }

    await db.createMessage({
      title: req.body.title,
      message: req.body.text,
      timestamp: new Date(),
      userId: req.user.id,
    });

    res.redirect('/');
  }),
];

exports.messagesDeleteGet = (req, res) => {
  res.render('./views/delete', {
    title: 'Members Only | Delete Message Confirmation',
    messageId: req.params.id,
  });
};

exports.messagesDeletePost = asyncHandler(async (req, res) => {
  await db.deleteMessage(req.params.id);

  res.redirect('/');
});
