const pool = require('./pool');

const getPartialMessageDetails = async () => {
  try {
    const { rows } = await pool.query(
      'SELECT id, title, message FROM messages',
    );

    return rows;
  } catch (err) {
    console.error('Error querying database:', err);
    throw new Error('DB_QUERY_ERROR');
  }
};

const getFullMessageDetails = async () => {
  try {
    const { rows } = await pool.query(`
      SELECT m.id, m.title, m.message, m.timestamp, CONCAT(u.first_name, ' ', u.last_name) AS full_name
      FROM messages AS m
      JOIN users AS u ON m.user_id = u.id;
    `);

    return rows;
  } catch (err) {
    console.error('Error querying database:', err);
    throw new Error('DB_QUERY_ERROR');
  }
};

const getUsername = async (username) => {
  try {
    const { rows } = await pool.query(
      'SELECT username FROM users WHERE username = $1',
      [username],
    );

    return rows;
  } catch (err) {
    console.error('Error querying database:', err);
    throw new Error('DB_QUERY_ERROR');
  }
};

const getLoginCredentials = async (username, password) => {
  try {
    const { rows } = await pool.query(
      'SELECT username, password FROM users WHERE username = $1 AND password = $2',
      [username, password],
    );

    return rows;
  } catch (err) {
    console.error('Error querying database:', err);
    throw new Error('DB_QUERY_ERROR');
  }
};

const createUser = async ({
  firstName,
  lastName,
  username,
  password,
  membershipStatus,
}) => {
  try {
    await pool.query(
      'INSERT INTO users (first_name, last_name, username, password, membership_status) VALUES ($1, $2, $3, $4, $5)',
      [firstName, lastName, username, password, membershipStatus],
    );
  } catch (err) {
    console.error('Error adding user into database:', err);
    throw new Error('DB_INSERT_INTO_ERROR');
  }
};

const updateUser = async ({ membershipStatus }, { req }) => {
  try {
    await pool.query(
      `
      UPDATE users
      SET membership_status = $1
      WHERE id = $2
    `,
      [membershipStatus, req.user.id],
    );
  } catch (err) {
    console.error('Error updating user into database:', err);
    throw new Error('DB_UPDATE_ERROR');
  }
};

const createMessage = async ({ title, message, timestamp, userId }) => {
  try {
    await pool.query(
      'INSERT INTO messages (title, message, timestamp, user_id) VALUES ($1, $2, $3, $4)',
      [title, message, timestamp, userId],
    );
  } catch (err) {
    console.error('Error adding message into database:', err);
    throw new Error('DB_INSERT_INTO_ERROR');
  }
};

const deleteMessage = async (messageId) => {
  try {
    await pool.query('DELETE FROM messages WHERE id = $1', [messageId]);
  } catch (err) {
    console.error('Error deleting from database:', err);
    throw new Error('DB_DELETE_FROM_ERROR');
  }
};

module.exports = {
  getPartialMessageDetails,
  getFullMessageDetails,
  getUsername,
  getLoginCredentials,
  createUser,
  updateUser,
  createMessage,
  deleteMessage,
};
