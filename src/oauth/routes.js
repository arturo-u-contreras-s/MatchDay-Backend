/*
  Express router for authenticating users.
*/
const { Router } = require('express');
const controller = require('./controller');
const router = Router();
const authenticated = require("../../middleware/authenticated.js");

router.get("/google", controller.googleAuthRedirect);
router.get("/google/callback", controller.googleAuthCallback);
router.get("/check-session", controller.checkUserLoggedIn);
router.get("/logout", controller.logout);

module.exports = router;