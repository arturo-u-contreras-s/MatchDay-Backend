/*
  Database connection pool using the `pg` library.
  - Reads PostgreSQL credentials from environment variables with fallbacks. 
*/
const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.PG_USER || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DB || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  port: process.env.PG_PORT || 5432,
});

module.exports = pool; // exports the pool instance for use in database operations