const asyncHandler = require('express-async-handler');
const db = require('../db/queries');

exports.homeGet = asyncHandler(async (req, res) => {
  const messages = await db.getPartialMessageDetails();

  res.render('./views/index', {
    title: 'Members Only | Home',
    messages,
    user: req.user,
  });
});
