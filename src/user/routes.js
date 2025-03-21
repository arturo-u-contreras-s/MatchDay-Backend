/*
  Express router for managing users.
*/
const { Router } = require('express');
const controller = require('./controller');
const router = Router(); // Create router object, add routes to it, export the router for use
const isAuthenticated = require("../../middleware/authenticated.js");

router.get('/:googleId', isAuthenticated, controller.getUserByGoogleId);

module.exports = router;