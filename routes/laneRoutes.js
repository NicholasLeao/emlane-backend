//  Imports
const express = require('express');
const laneController = require('../controllers/laneController');

//  Routes
const router = express.Router();

router
  .route('/')
  .get(laneController.getAllLanes)
  .post(laneController.createLane);

router
  .route('/:id')
  .get(laneController.getLane)
  .patch(laneController.updateLane)
  .delete(laneController.deleteLane);

// Exports
module.exports = router;
