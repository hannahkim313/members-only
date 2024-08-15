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

// TODO: call function when implementing authentication to display full
// message details to authorized users
const getFullMessageDetails = async () => {
  try {
    const { rows } = await pool.query(`
      SELECT m.title, m.message, m.timestamp, CONCAT(u.first_name, ' ', u.last_name) AS full_name
      FROM messages AS m
      JOIN users AS u ON m.author_id = u.id;
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

// TODO: create a new user and insert into the database

module.exports = {
  getPartialMessageDetails,
  getFullMessageDetails,
  getUsernames,
};
