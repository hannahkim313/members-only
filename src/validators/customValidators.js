require('dotenv').config();
const db = require('../db/queries');

const usernameExists = async (username) => {
  try {
    const result = await db.getUsername(username);

    if (result.length > 0) {
      throw new Error('The username already exists.');
    }

    return true;
  } catch (err) {
    if (err.message === 'The username already exists.') {
      throw err;
    } else {
      console.error('Error querying database:', err);
      throw new Error('DB_QUERY_ERROR');
    }
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

const isValidUsername = async (username) => {
  try {
    const result = await db.getUsername(username);

    if (result.length === 0) {
      throw new Error('Incorrect username.');
    }

    return true;
  } catch (err) {
    if (err.message === 'Incorrect username.') {
      throw err;
    } else {
      console.error('Error querying database:', err);
      throw new Error('DB_QUERY_ERROR');
    }
  }
};

const doesPasswordMatchUsername = async (password, { req }) => {
  try {
    const result = await db.getLoginCredentials(req.body.username, password);

    if (result.length === 0) {
      throw new Error('Incorrect password.');
    }

    return true;
  } catch (err) {
    if (err.message === 'Incorrect password.') {
      throw err;
    } else {
      console.error('Error querying database:', err);
      throw new Error('DB_QUERY_ERROR');
    }
  }
};

module.exports = {
  usernameExists,
  passwordsMatch,
  isValidPasscode,
  isValidUsername,
  doesPasswordMatchUsername,
};
