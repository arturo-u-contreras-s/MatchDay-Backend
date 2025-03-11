/*
  SQL queries for managing users.  
*/

const getUsers = "SELECT * FROM users;";
const getUserById = "SELECT id FROM users WHERE id = $1;";
const getUserByEmail = "SELECT * FROM users WHERE email = $1 LIMIT 1;";

const addUserByEmail = "INSERT INTO users (email) VALUES ($1) RETURNING *;";
const deleteUserById = "DELETE FROM users WHERE id = $1;";

module.exports = {
  getUsers,
  getUserByEmail,
  addUserByEmail,
  deleteUserById,
  getUserById
};