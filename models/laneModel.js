//  Imports
const mongoose = require('mongoose');

//  Lane schema
const laneSchema = new mongoose.Schema({});

// Create and export model
const User = mongoose.model('Lane', laneSchema);
module.exports = User;
