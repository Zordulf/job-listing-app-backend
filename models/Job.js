const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  position: {type: String, required: true},
  description: {type: String, required: true},
  location: {type: String, required: true},
  skills: {type: String, required: true},
  salary: Number,
  image: String
});

module.exports = mongoose.model('Job', JobSchema);