const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, 'Interview must have company name'],
    },

    interviewDate: {
      type: Date,
      required: [true, 'Interview must have valid date'],
    },

    registeredStudent: {
      type: mongoose.Schema.ObjectId,
      ref: 'Student',
      required: [true, 'Interview must have a student_ID'],
    },

    status: {
      type: String,
      enum: ['pass', 'Pass', 'Fail', 'onHold', "Didn't Attempt"],
      default: 'onHold',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// this is pre find mongoose middleware, here using it for populating registered student interview !
interviewSchema.pre('find', function (next) {
  this.populate({
    path: 'registeredStudent',
    select: '-__v -interviews -results',
  });

  next();
});

// virtual fields are not stored in databse, it is only rendered for output
interviewSchema.virtual('readableDate').get(function () {
  return this.interviewDate.toDateString();
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
