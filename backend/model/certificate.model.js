const mongoose = require('mongoose');

const certSchema = new mongoose.Schema({
  title: String,
  issuer: String,
  id: String,
  date: String,
  link: String,
  image: String,
});

const certificates = mongoose.model('Certificates', certSchema)

module.exports = certificates
