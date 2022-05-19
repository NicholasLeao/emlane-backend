const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const User = require('../models/userModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_URL.replace('<password>', process.env.PASSWORD);


mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB Connection successful'));

// DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// PROCESS ARGS
if (process.argv.includes('--import')) {
} else if (process.argv.includes('--delete')) {
  deleteData();
}
