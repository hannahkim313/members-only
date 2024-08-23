require('dotenv').config();
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

const isValidPasscode = (passcode) => {
  if (
    passcode === process.env.GUEST_PASSCODE ||
    passcode === process.env.MEMBER_PASSCODE ||
    passcode === process.env.ADMIN_PASSCODE
  ) {
    return true;
  }

  return false;
};

module.exports = {
  usernameExists,
  passwordsMatch,
  isValidPasscode,
};
