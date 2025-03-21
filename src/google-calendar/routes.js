/*
  Express router for managing the users google calendar.
*/
const { Router } = require('express');
const controller = require('./controller');
const router = Router();
const isAuthenticated = require("../../middleware/authenticated.js");

router.post("/", isAuthenticated, controller.addEventToGoogleCalendar);

module.exports = router;