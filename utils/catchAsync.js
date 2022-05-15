// Deliver middleware with catch functionality
module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => next(err));
};
