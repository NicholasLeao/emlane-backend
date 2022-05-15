//  Imports
const express = require('express');

const userRouter = require('./routes/userRoutes');
const laneRouter = require('./routes/laneRoutes');
const engramRouter = require('./routes/engramRoutes');
const instanceRouter = require('./routes/instanceRoutes');

// Safety and error handler
const errorHandler = require('./controllers/errorController');

// Main app
const app = express();

// Routers
app.use('/users', userRouter);
app.use('/lanes', laneRouter);
app.use('/engrams', engramRouter);
app.use('/instances', instanceRouter);

// Middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.static(`${__dirname}/public`));

// Cant locate URL
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't locate ${req.originalUrl}`,
  });
});

// Global error handler
app.use(errorHandler);

//  Exports app
module.exports = app;
