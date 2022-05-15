//  Imports
const mongoose = require('mongoose');

//  Engram schema
const instanceSchema = new mongoose.Schema({});

// Create and export model
const User = mongoose.model('Engram', instanceSchema);
module.exports = User;
