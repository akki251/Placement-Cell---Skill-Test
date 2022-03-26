const catchAsync = require('../utils/catchAsync');
const Employee = require('../models/Employee');
const AppError = require('../utils/appError');

exports.signup = catchAsync(async (req, res, next) => {
  // getting data from body
  const { name, email, password } = req.body;

  // creating employee
  const employee = await Employee.create({ name, email, password });

  res.status(200).json({
    status: 'success',
    data: employee,
  });
});

exports.signin = catchAsync(async (req, res, next) => {
  // passport checking password for login
  if (req.isAuthenticated()) {
    const token = req.user._id;

    // creating cookie options
    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true, // prevent modifying of cookie
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    };

    // storing the jwt in cookie
    res.cookie('jwt', token, cookieOptions);

    // making user password undefined so that it don't get leaked in the response
    req.user.password = undefined;

    res.status(200).json({
      status: 'success',
      user: req.user,
    });
  }
});

exports.logout = catchAsync(async (req, res, next) => {
  // clearing cookie 
  res.clearCookie('jwt');
  res.redirect('/');
});

exports.protect = catchAsync(async (req, res, next) => {
  // protect middleware to check only allow logged in user to access the project 
  if (req.cookies.jwt) {
    const employee = await Employee.findById(req.cookies.jwt).select(
      '-_id  -__v -password'
    );
    res.locals.employee = employee;
    req.employee = employee;
  } else {
    return next(new AppError('You are not authorized', 401));
  }

  next();
});
