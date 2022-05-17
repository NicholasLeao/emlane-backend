// imports
const User = require('../models/userModel');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Handlers
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!user) {
    return next(new AppError('Invalid ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError('Invalid ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getChildren = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate('children');

  if (!user) {
    return next(new AppError('Invalid ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: user.children,
  });
});

exports.pushChildren = catchAsync(async (req, res, next) => {
  if (!req.body.children) {
    return next(new AppError('Invalid ObjectId', 404));
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $push: { children: req.body.children } },
    {
      runValidators: true,
      new: true,
    }
  );

  if (!user) {
    return next(new AppError('Invalid ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});
