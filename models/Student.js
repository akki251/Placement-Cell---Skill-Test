const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  college: {
    type: String,
    required: true,
  },

  placement_status: {
    type: String,
    enum: ['placed', 'notPlaced'],
    default: 'notPlaced',
  },

  dsaScore: Number,
  webScore: Number,
  reactScore: Number,

  interviews: [{ type: mongoose.Schema.ObjectId, ref: 'Interview' }],
});

// this is pre find mongoose middleware, here using it for populating registered student interview !
studentSchema.pre('find', function (next) {
  this.populate({
    path: 'interviews',
    select: 'companyName interviewDate status -registeredStudent -_id',
  });

  next();
});
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
