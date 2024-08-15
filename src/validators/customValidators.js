const db = require('../db/queries');

const usernameExists = async (username) => {
  try {
    const usernames = await db.getUsernames(username);

    if (parseInt(usernames[0].count, 10) > 0) {
      throw new Error('The username already exists.');
    }

    return true;
  } catch (err) {
    console.error('Error querying database:', err);
    throw new Error('DB_QUERY_ERROR');
  }
};

const passwordsMatch = (confirmPassword, { req }) => {
  return confirmPassword === req.body.password;
};

module.exports = {
  usernameExists,
  passwordsMatch,
};
