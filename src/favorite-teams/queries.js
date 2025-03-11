/*
  SQL queries for managing users' favorite teams.  
*/

/*
Side-Note: These queries use parameterized SQL (`$1`, `$2`) to prevent SQL injection.
- Even if an attacker enters "1; DROP TABLE users;",
it will be treated as a single value ('1; DROP TABLE users;') instead of executable SQL.

const query = "SELECT * FROM users WHERE id = " + userId; would be vunerable
- The query becomes: 
SELECT * FROM users WHERE id = 1; DROP TABLE users;
*/

const getFavoriteTeamsByUserId = "SELECT team_id FROM favorite_teams WHERE user_id = $1;";
const getFavoriteTeam = "SELECT * FROM favorite_teams WHERE user_id = $1 AND team_id = $2;";
const addFavoriteTeam = "INSERT INTO favorite_teams (user_id, team_id) VALUES ($1, $2) RETURNING *;";
const deleteFavoriteTeam = "DELETE FROM favorite_teams WHERE user_id = $1 AND team_id = $2;";

const getUserById = "SELECT id FROM users WHERE id = $1;";

module.exports = {
  getFavoriteTeamsByUserId,
  getFavoriteTeam,
  addFavoriteTeam,
  getUserById,
  deleteFavoriteTeam
};