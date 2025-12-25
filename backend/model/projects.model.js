const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  role: String,
  image: String,
  description: String,
});

const projects = mongoose.model('Projects', projectSchema);

module.exports = projects;