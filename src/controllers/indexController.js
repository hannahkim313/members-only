const asyncHandler = require('express-async-handler');
const messageService = require('../services/messageService');

exports.homeGet = asyncHandler(async (req, res) => {
  const messages = await messageService.getMessages(req.user);

  res.render('./views/index', {
    title: 'Members Only | Home',
    messages,
    user: req.user,
  });
});
