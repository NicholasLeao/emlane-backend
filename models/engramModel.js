//  Imports
const mongoose = require('mongoose');
const slugify = require('slugify');

//  Engram schema
const engramSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: [
        40,
        'An engram must have a title with less or equal than 40 characters.',
      ],
    },
    slug: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    modifiedAt: {
      type: Date,
      default: Date.now(),
    },
    active: { type: Boolean, default: true },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: [12, 'A tag should not have more than 12 characters'],
      },
    ],
    length: Number,
    owner: mongoose.SchemaTypes.ObjectId,
    children: [mongoose.SchemaTypes.ObjectId],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//  Middleware
engramSchema.pre('save', function (next) {
  this.length = this.children.length;
  this.slug = slugify(this.title, { lower: true });
  this.modifiedAt = Date.now();
  next();
});

engramSchema.pre(/^find/, function (next) {
  this.find({ active: true });
  next();
});

engramSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { active: true } });
  next();
});

//  Create and export model
const User = mongoose.model('Engram', engramSchema);
module.exports = User;
