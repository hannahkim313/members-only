const pool = require('./pool');

const getPartialMessageDetails = async () => {
  try {
    const { rows } = await pool.query('SELECT title, message FROM messages');

    return rows;
  } catch (err) {
    console.error('Error querying database:', err);
    throw new Error('DB_QUERY_ERROR');
  }
};

const getFullMessageDetails = async () => {
  try {
    const { rows } = await pool.query(`
      SELECT m.title, m.message, m.timestamp, CONCAT(u.first_name, ' ', u.last_name) AS full_name
      FROM messages AS m
      JOIN users AS u ON m.author = u.id;
      `);

    return rows;
  } catch (err) {
    console.error('Error querying database:', err);
    throw new Error('DB_QUERY_ERROR');
  }
};

const getUsernames = async (username) => {
  try {
    const { rows } = await pool.query(
      'SELECT COUNT(*) FROM users WHERE username = $1',
      [username],
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

module.exports = {
  getPartialMessageDetails,
  getFullMessageDetails,
  getUsernames,
  createUser,
};
