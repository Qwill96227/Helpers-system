const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  identifier: String,
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

module.exports = mongoose.model('Volunteer', volunteerSchema);

