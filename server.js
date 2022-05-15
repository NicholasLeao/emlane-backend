// IMPORTS
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// Configure dotenv
dotenv.config({ path: './config.env' });

// Establish connection
mongoose
  .connect(
    process.env.DATABASE_URL.replace('<password>', process.env.PASSWORD),
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log('DB Connection successful');
  });

// List to port
const server = app.listen(process.env.PORT, () =>
  console.log(`Server running (${process.env.PORT})`)
);

// Safety net error handler, for uncaught errors
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION 🎆🎆🎆');
  server.close(() => process.exit(1));
});
