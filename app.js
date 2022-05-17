//  Imports
const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const laneRouter = require('./routes/laneRoutes');
const engramRouter = require('./routes/engramRoutes');
const instanceRouter = require('./routes/instanceRoutes');

// Safety and error handler
const errorHandler = require('./controllers/errorController');

// Main app
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Not working
app.use(cors({ origin: process.env.REACT_APP_URL }));

// Express cors workaround
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

// Routers
app.use('/users', userRouter);
app.use('/lanes', laneRouter);
app.use('/engrams', engramRouter);
app.use('/instances', instanceRouter);

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
