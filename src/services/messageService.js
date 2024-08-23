const db = require('../db/queries');

const getMessages = async (user) => {
  if (user) {
    return await db.getFullMessageDetails();
  } else {
    return await db.getPartialMessageDetails();
  }
};

module.exports = {
  getMessages,
};
