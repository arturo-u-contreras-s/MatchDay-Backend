/*
  SQL queries for managing users.  
*/

const getUsers = "SELECT * FROM users;";
const getUserById = "SELECT id FROM users WHERE id = $1;";
const getUserByGoogleId = "SELECT * FROM users WHERE google_id = $1 LIMIT 1;";

const addUserByGoogleId = "INSERT INTO users (google_id) VALUES ($1) RETURNING *;";
const deleteUserById = "DELETE FROM users WHERE id = $1;";

module.exports = {
  getUsers,
  getUserByGoogleId,
  addUserByGoogleId,
  deleteUserById,
  getUserById
};