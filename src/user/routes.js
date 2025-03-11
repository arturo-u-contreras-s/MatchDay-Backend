/*
  Express router for managing users.
*/
const { Router } = require('express');
const controller = require('./controller');
const router = Router(); // Create router object, add routes to it, export the router for use

router.get('/', controller.getUsers);
router.get('/:email', controller.getUserByEmail);
router.post('/:email', controller.addUserByEmail);
router.delete('/:id', controller.deleteUserById);

module.exports = router;