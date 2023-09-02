const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  patientID: {
    type: String,
    required: true,
  },
  classification: {
    type: String,
    enum: ['Injured', 'Non-injured'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  image: {
    type: String, // store the image URL 
    required: true,
  },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
