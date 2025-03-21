const express = require("express");
const cors = require("cors");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./db");
const passport = require("./config/passport");
require("dotenv").config();

const logger = require("./middleware/logger.js");
const notFound = require("./middleware/notFound.js");
const errorHandler = require("./middleware/error.js");

const userRoutes = require("./src/user/routes");
const favoriteTeamsRoutes = require("./src/favorite-teams/routes");
const oauthRoutes = require("./src/oauth/routes");
const googleCalendarRoutes = require("./src/google-calendar/routes");

const app = express();

app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

app.use(
  session({
    store: new pgSession({
      pool: pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || "super_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 10,
    },
  })
);

/* Initialize Passport.js */
app.use(passport.initialize());
app.use(passport.session());

app.use(logger);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/favorite-teams", favoriteTeamsRoutes);
app.use("/api/v1/oauth", oauthRoutes);
app.use("/api/v1/google-calendar", googleCalendarRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app; // Export app without starting the server