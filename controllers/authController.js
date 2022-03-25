const catchAsync = require('../utils/catchAsync');
const Employee = require('../models/Employee');
const AppError = require('../utils/appError');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const employee = await Employee.create({ name, email, password });
  res.status(200).json({
    status: 'success',
    data: employee,
  });
});

exports.signin = catchAsync(async (req, res, next) => {
  if (req.isAuthenticated()) {
    const token = req.user._id;

    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true, // prevent modifying of cookie
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    };

    // storing the jwt in cookie
    res.cookie('jwt', token, cookieOptions);

    req.user.password = undefined;

    res.status(200).json({
      status: 'success',
      user: req.user,
      session: req.session,
    });
  }
});

exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie('jwt');
  res.redirect('/');
});

exports.protect = catchAsync(async (req, res, next) => {
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
