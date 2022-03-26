const Student = require('../models/Student');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllStudents = catchAsync(async (req, res, next) => {
  
  // getting all students 
  const students = await Student.find();

  res.status(200).json({
    status: 'success',
    data: students,
  });
});

exports.createStudent = catchAsync(async (req, res, next) => {
  // creating student 
  const { name, college, dsaScore, webScore, reactScore } = req.body;

  const student = await Student.create({
    name,
    college,
    dsaScore,
    webScore,
    reactScore,
  });

  res.status(200).json({
    status: 'success',
    data: student,
  });
});
