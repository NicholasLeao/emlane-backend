//  Imports
const express = require('express');
const engramController = require('../controllers/engramController');

//  Routes
const router = express.Router();

router
  .route('/')
  .get(engramController.getAllEngrams)
  .post(engramController.createEngram);

router
  .route('/:id')
  .get(engramController.getEngram)
  .patch(engramController.updateEngram)
  .delete(engramController.deleteEngram);

router
  .route('/children/:id')
  .get(engramController.getChildren)
  .post(engramController.pushChildren)
  .delete(engramController.deleteChildren)

// Exports
module.exports = router;
