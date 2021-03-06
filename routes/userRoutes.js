//  Imports
const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

//  Routes
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router
  .route('/children/:id')
  .get(userController.getChildren)
  .post(userController.pushChildren);
// Exports
module.exports = router;
