const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose.connect(url);
};
// from john, jobster-api 6.5
module.exports = connectDB;
