// imports
const Lane = require('../models/laneModel');

// imports error handlers and utils
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Handlers
exports.getAllLanes = catchAsync(async (req, res, next) => {
  const lanes = await Lane.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: lanes.length,
    data: {
      lanes,
    },
  });
});

exports.createLane = catchAsync(async (req, res) => {
  const newLane = await Lane.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      lane: newLane,
    },
  });
});

exports.getLane = catchAsync(async (req, res) => {
  const lane = await Lane.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      lane,
    },
  });
});

exports.updateLane = catchAsync(async (req, res, next) => {
  const lane = await Lane.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!lane) {
    return next(new AppError('Invalid ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      lane,
    },
  });
});

exports.deleteLane = catchAsync(async (req, res, next) => {
  const lane = await Lane.findByIdAndDelete(req.params.id);

  if (!lane) {
    return next(new AppError('Invalid ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getChildren = catchAsync(async (req, res, next) => {
  const lane = await Lane.findById(req.params.id).populate('children');

  if (!lane) {
    return next(new AppError('Invalid ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: lane.children,
  });
});

exports.pushChildren = catchAsync(async (req, res, next) => {
  if (!req.body.children) {
    return next(new AppError('Invalid ObjectId', 404));
  }

  const lane = await Lane.findByIdAndUpdate(
    req.params.id,
    { $push: { children: req.body.children } },
    {
      runValidators: true,
      new: true,
    }
  );

  if (!lane) {
    return next(new AppError('Invalid ID', 404));
  }

  res.status(200).json({
    status: 'success',
    lane,
  });
});
