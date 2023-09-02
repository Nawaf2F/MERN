const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema

// Database connection
if (process.env.NODE_ENV === 'test') {
    mongoose.connect('mongodb://127.0.0.1:27017/MERN', { useNewUrlParser: true, useUnifiedTopology: true });
} else {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/MERN', { useNewUrlParser: true, useUnifiedTopology: true });
}

const doctorSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  DoctorType: {
    type: String,
    enum: ['Radiologist', 'Orthopedic Surgeons', 'Emergency Physicians', 'General Practitioners', 'Trainees'],
    required: true,
  },
});

doctorSchema.plugin(passportLocalMongoose);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
