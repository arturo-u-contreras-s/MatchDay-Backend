/*
  Controller for managing users.
*/

const pool = require('../../db');
const queries = require('./queries');

const getUsers = (req, res, next) => {
  pool.query(queries.getUsers, (err, results) => {
    if (err) {
      console.error("Error getting users:", err);
      return next(new Error("Failed to retrieve users"));
    }

    res.status(200).json(results.rows);
  });
}

const getUserByEmail = (req, res, next) => {
  const email = req.params.email;
  /* Validate email format */
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const error = new Error('Invalid email format');
    error.status = 400;
    return next(error);
  }

  pool.query(queries.getUserByEmail, [email], (err, results) => {
    if (err) {
      console.error("Error fetching user by email:", err);
      return next(new Error('Failed to get users by email'));
    }

    if (results.rows.length === 0) {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }

    res.status(200).json(results.rows[0]);
  });
}

const addUserByEmail = async (req, res, next) => {
  const email = req.params.email;
  /* Validate email format */
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const error = new Error('Invalid email format');
    error.status = 400;
    return next(error);
  }

  try {
    /* Check if there is already a user with that email */
    const userCheckResult = await pool.query(queries.getUserByEmail, [email]);
    if (userCheckResult.rows.length !== 0) {
      const error = new Error('User already exists');
      error.status = 400;
      return next(error);
    }

    /* Add the new user */
    const insertResult = await pool.query(queries.addUserByEmail, [email]);
    res.status(201).json({
      message: "User added successfully",
      user: insertResult.rows[0],
    });
  } catch(error) {
    console.error("Error adding user:", error);
    const err = new Error();
    return next(err);
  }
}

const deleteUserById = async (req, res, next) => {
  const userId = parseInt(req.params.id, 10);
  /* Check that the userId is a number */
  if (!Number.isInteger(userId) || userId <= 0) {
    const error = new Error('Invalid user ID');
    error.status = 400;
    return next(error);
  }

  try {
    /* Check that the user exists */
    const userCheckResult = await pool.query(queries.getUserById, [userId]);
    if (userCheckResult.rows.length === 0) {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }

    /* Delete the user */
    await pool.query(queries.deleteUserById, [userId]);
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch(error) {
    console.error("Error deleting user:", error);
    const err = new Error();
    return next(err);
  }
}

module.exports = {
  getUsers,
  getUserByEmail,
  addUserByEmail,
  deleteUserById
};