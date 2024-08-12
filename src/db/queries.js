const pool = require('./pool');

const getPartialMessageDetails = async () => {
  const { rows } = await pool.query('SELECT title, message FROM messages');

  return rows;
};

// TODO: call function when implementing authentication to display full
// message details to authorized users
const getFullMessageDetails = async () => {
  const { rows } = await pool.query(`
    SELECT m.title, m.message, m.timestamp, CONCAT(u.first_name, ' ', u.last_name) AS full_name
    FROM messages AS m
    JOIN users AS u ON m.author_id = u.id;
  `);

  return rows;
};

module.exports = {
  getPartialMessageDetails,
  getFullMessageDetails,
};
