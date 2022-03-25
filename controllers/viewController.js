const Employee = require('../models/Employee');
const Student = require('../models/Student');
const catchAsync = require('../utils/catchAsync');
const Interview = require('../models/Interview');
// const ppError = require('../utils/appError');

//
// ────────────────────────────────────────────────────────────── I ──────────
//   :::::: M I D L L E W A R E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────
//

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    const employee = await Employee.findById(req.cookies.jwt).select(
      '-_id  -__v -password'
    );
    res.locals.employee = employee;
    // return res.redirect('/');
  } else {
    res.locals.employee = null;
  }

  next();
};

exports.isAgent = (req, res, next) => {
  if (req.cookies.jwt) {
    return res.redirect('/');
  }
  next();
};

//
// ──────────────────────────────────────────────────── I ──────────
//   :::::: CONTROLLERS : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
//

exports.home = (req, res) => {
  res.status(200).render('home', {
    title: 'Placement Cell',
  });
};

exports.signup = (req, res) => {
  res.status(200).render('signup', {
    title: 'Placement Cell | Signup',
  });
};
exports.signin = (req, res) => {
  res.status(200).render('signin', {
    title: 'Placement Cell | Signin',
  });
};

/// /// students page controllers

exports.getAllStudents = catchAsync(async (req, res, next) => {
  const students = await Student.find();

  res.status(200).render('students', {
    data: students,
    title: 'Placement | All students',
  });
});

exports.createStudent = (req, res) => {
  res.status(200).render('createStudent', {
    title: 'Placement Cell | create',
  });
};

/// Interview controllers

exports.getAllInterviews = catchAsync(async (req, res, next) => {
  const interviews = await Interview.find();

  res.status(200).render('interviews', {
    data: interviews,
    title: 'Placement | All Interviews',
  });
});

exports.createInterview = (req, res) => {
  res.status(200).render('createInterview', {
    title: 'Placement Cell | create Interview',
  });
};
