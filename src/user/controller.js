/*
  Controller for managing users.
*/

const pool = require('../../db');
const queries = require('./queries');

const getUserById = (req, res, next) => {
  const user = req.user;
  if (!user || !user.user_id || !user.google_id) {
    const error = new Error('Unauthorized: Please log in');
    error.status = 401;
    return next(error);
  }

  res.status(200).json(user);
}

module.exports = {
  getUserById,
  deleteUserById
};