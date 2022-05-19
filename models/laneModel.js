//  Imports
const mongoose = require('mongoose');
const slugify = require('slugify');

//  Lane schema
const laneSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A lane must have a title'],
      trim: true,
      maxlength: [
        40,
        'A lane must have a title with less or equal than 40 characters.',
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
    lastEngramIndex: { type: Number, default: 0 },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: [12, 'A tag should not have more than 12 characters'],
      },
    ],
    length: Number,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      // required: [true, 'A lane must belong to a user'],
      ref: 'User',
    },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Engram' }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//  Middleware
laneSchema.pre('save', function (next) {
  this.length = this.children.length;
  this.slug = slugify(this.title, { lower: true });
  this.modifiedAt = Date.now();
  next();
});

laneSchema.pre(/^find/, function (next) {
  this.find({ active: true });
  next();
});

laneSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { active: true } });
  next();
});

//  Create and export model
const Lane = mongoose.model('Lane', laneSchema);
module.exports = Lane;
