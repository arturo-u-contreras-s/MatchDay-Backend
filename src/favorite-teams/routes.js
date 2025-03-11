/*
  Express router for managing users' favorite teams.
*/

const { Router } = require('express');
const controller = require('./controller');
const router = Router(); // Create router object, add routes to it, export the router for use

router.get('/:id', controller.getFavoriteTeamsByUserId);
router.post('/', controller.addFavoriteTeam);
router.delete('/', controller.deleteFavoriteTeam);

module.exports = router;