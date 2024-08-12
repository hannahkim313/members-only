const db = require('../db/queries');

exports.homeGet = async (req, res) => {
  const messages = await db.getPartialMessageDetails();

  res.render('./views/index', {
    title: 'Members Only | Home',
    messages,
  });
};
