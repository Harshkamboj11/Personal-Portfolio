const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

const contactModel = mongoose.model('Contact Requests', contactSchema);

module.exports = contactModel