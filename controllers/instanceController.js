// imports
const Instance = require('../models/instanceModel');

// imports error handlers and utils
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Handlers
exports.getAllInstances = catchAsync(async (req, res, next) => {
  const instances = await Instance.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: instances.length,
    data: {
      instances,
    },
  });
});

exports.createInstance = catchAsync(async (req, res) => {
  const newInstance = await Instance.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      instance: newInstance,
    },
  });
});

exports.getInstance = catchAsync(async (req, res) => {
  const instance = await Instance.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      instance,
    },
  });
});

exports.updateInstance = catchAsync(async (req, res, next) => {
  const instance = await Instance.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!instance) {
    return next(new AppError('Invalid ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      instance,
    },
  });
});

exports.deleteInstance = catchAsync(async (req, res, next) => {
  const instance = await Instance.findByIdAndDelete(req.params.id);

  if (!instance) {
    return next(new AppError('Invalid ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// Aggregator handlers
