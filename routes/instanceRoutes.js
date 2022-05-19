//  Imports
const express = require('express');
const instanceController = require('../controllers/instanceController');

//  Routes
const router = express.Router();

router
  .route('/')
  .get(instanceController.getAllInstances)
  .post(instanceController.createInstance);

router
  .route('/:id')
  .get(instanceController.getInstance)
  .patch(instanceController.updateInstance)
  .delete(instanceController.deleteInstance);

// Exports
module.exports = router;