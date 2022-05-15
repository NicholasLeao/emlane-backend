//  Imports
const mongoose = require('mongoose');

//  Engram schema
const engramSchema = new mongoose.Schema({});

// Create and export model
const User = mongoose.model('Engram', engramSchema);
module.exports = User;
