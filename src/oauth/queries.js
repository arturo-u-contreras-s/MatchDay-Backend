/*
  SQL queries for managing users.  
*/

const getUserById = `SELECT * FROM users WHERE user_id = $1;`;
const getUserByGoogleId = "SELECT * FROM users WHERE google_id = $1;";
const addUserByGoogleId = "INSERT INTO users (google_id) VALUES ($1) RETURNING *;";

module.exports = {
  getUserById,
  getUserByGoogleId,
  addUserByGoogleId
};