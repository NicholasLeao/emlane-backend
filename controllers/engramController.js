// imports
const Engram = require('../models/engramModel');

// imports error handlers and utils
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Handlers
exports.getAllEngrams = catchAsync(async (req, res, next) => {
  const engrams = await Engram.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: engrams.length,
    data: {
      engrams,
    },
  });
});

exports.createEngram = catchAsync(async (req, res) => {
  const newEngram = await Engram.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      engram: newEngram,
    },
  });
});

exports.getEngram = catchAsync(async (req, res) => {
  const engram = await Engram.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      engram,
    },
  });
});

exports.updateEngram = catchAsync(async (req, res, next) => {
  const engram = await Engram.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!engram) {
    return next(new AppError('Invalid ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      engram,
    },
  });
});

exports.deleteEngram = catchAsync(async (req, res, next) => {
  const engram = await Engram.findByIdAndDelete(req.params.id);

  if (!engram) {
    return next(new AppError('Invalid ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
