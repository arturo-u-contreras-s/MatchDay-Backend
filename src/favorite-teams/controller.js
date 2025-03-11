/*
  Controller for managing users' favorite teams.
*/

const pool = require('../../db');
const queries = require('./queries');

const getFavoriteTeamsByUserId = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  /* Check that the userId is a number */
  if (!Number.isInteger(userId) || userId <= 0) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    /* Check if user exists */
    const userCheckResult = await pool.query(queries.getUserById, [userId]);
    if (userCheckResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    /* Get favorite teams */
    const results = await pool.query(queries.getFavoriteTeamsByUserId, [userId]);
    res.status(200).json(results.rows.map(row => row.team_id));
  } catch (error) {
    console.error("Error fetching favorite teams by user id:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const addFavoriteTeam = async (req, res) => {
  const userId = parseInt(req.body.userId, 10);
  const teamId = parseInt(req.body.teamId, 10);

  /* Check that the ids are numbers */
  if (!Number.isInteger(userId) || userId <= 0) {
    return res.status(400).json({ error: "Invalid user ID" });
  }
  if (!Number.isInteger(teamId) || teamId <= 0) {
    return res.status(400).json({ error: "Invalid team ID" });
  }

  try {
    /* Check if the user exists */
    const userCheckResult = await pool.query(queries.getUserById, [userId]);
    if (userCheckResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

     /* Check if the team is already favorited */
     const existingFavorite = await pool.query(queries.getFavoriteTeam, [userId, teamId]);
     if (existingFavorite.rows.length > 0) {
       return res.status(409).json({ error: "This team is already a favorite for this user" });
     }

    /* Insert the favorite team */
    const insertResult = await pool.query(queries.addFavoriteTeam, [userId, teamId]);
    res.status(201).json({
      message: "Favorite team added successfully",
      favoriteTeam: insertResult.rows[0],
    });
  } catch (error) {
    console.error("Error adding favorite team:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteFavoriteTeam = async (req, res) => {
  const { userId, teamId } = req.body;

  /* Check that the ids are numbers */
  if (!Number.isInteger(userId) || userId <= 0) {
    return res.status(400).json({ error: "Invalid user ID" });
  }
  if (!Number.isInteger(teamId) || teamId <= 0) {
    return res.status(400).json({ error: "Invalid team ID" });
  }

  try {
    /* Check if the user exists */
    const userCheckResult = await pool.query(queries.getUserById, [userId]);
    if (userCheckResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    /* Check if the favorite team exists before deleting */
    const favoriteCheckResult = await pool.query(queries.getFavoriteTeam, [userId, teamId]);
    if (favoriteCheckResult.rows.length === 0) {
      return res.status(404).json({ error: "Favorite team not found" });
    }

    /* Delete the currently favorited team */
    await pool.query(queries.deleteFavoriteTeam, [userId, teamId]);
    res.status(200).json({ message: "Favorite team deleted successfully" });
  } catch (error) {
    console.error("Error deleting favorite team:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getFavoriteTeamsByUserId,
  addFavoriteTeam,
  deleteFavoriteTeam,
};