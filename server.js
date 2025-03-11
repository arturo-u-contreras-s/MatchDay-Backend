const express = require('express');
const cors = require('cors');

const logger = require('./middleware/logger.js')
const notFound = require('./middleware/notFound.js')
const errorHandler = require('./middleware/error.js')

const userRoutes = require('./src/user/routes');
const favoriteTeamsRoutes = require('./src/favorite-teams/routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({origin: 'http://localhost:4200'}));

app.use(express.json()); // Parse incoming JSON requests

app.listen(port, () => console.log(`Listening on port: ${port}`)); // Starts the server on the specified port.

app.use(logger); // Log incoming requests

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/favorite-teams', favoriteTeamsRoutes);

app.use(notFound); // non existent endpoint error
app.use(errorHandler);