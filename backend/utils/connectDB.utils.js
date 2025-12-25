const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log('DB connected');
    })
    .catch((err) => {
      console.log('Error connecting DB - ', err);
    });
};

module.exports = connectDB;
