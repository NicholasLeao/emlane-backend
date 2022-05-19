//  Imports
const mongoose = require('mongoose');

//  Engram schema
const instanceSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  modifiedAt: {
    type: Date,
    default: Date.now(),
  },
  active: { type: Boolean, default: true },
  type: {
    type: String,
    default: 'text',
    enum: ['text', 'snippet', 'embed', 'picture'],
  },
  content: { type: String, default: '' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Lane' },
});

//  Middleware
instanceSchema.pre('save', function (next) {
  this.modifiedAt = Date.now();
  next();
});

instanceSchema.pre(/^find/, function (next) {
  this.find({ active: true });
  next();
});

instanceSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { active: true } });
  next();
});

//  Create and export model
const User = mongoose.model('Instance', instanceSchema);
module.exports = User;
