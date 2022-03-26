const express = require('express');
const passport = require('passport');
require('../controllers/passport');

const authController = require('../controllers/authController');
const studentController = require('../controllers/studentController');
const interviewController = require('../controllers/interviewController');
const viewController = require('../controllers/viewController');

const router = express.Router();

//
// ──────────────────────────────────────────────────────────────────── I ──────────
//   :::::: B A C K E N D   R O U T E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────
//

// ///AUTH ROUTES

router.route('/signup').post(authController.signup);

router.route('/signin').post(
  passport.authenticate('local', {
    failureRedirect: '/',
    failureMessage: 'Invalid username or password',
  }),
  authController.signin
);
router.route('/logout').get(authController.logout);

// /// STUDENT ROUTES
router
  .route('/student')
  .get(studentController.getAllStudents)
  .post(studentController.createStudent);

// /// INTERVIEW ROUTES
router
  .route('/interview')
  .get(interviewController.getAllInterviews)
  .post(interviewController.createInterview);

router.route('/interview/:id').patch(interviewController.updateInterview);
router.route('/download').get(interviewController.download);

//
// ────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: F R O N T E N D   R O U T E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────
//

// AUTH ROUTES

// frontend middleware
router.use(viewController.isLoggedIn);

router.route('/').get(viewController.home);
router.route('/signup').get(viewController.isAgent, viewController.signup);
router.route('/signin').get(viewController.isAgent, viewController.signin);

// backend middleware
router.use(authController.protect);

// STUDENTS ROUTE
router.route('/allStudents').get(viewController.getAllStudents);
router.route('/createStudent').get(viewController.createStudent);

// /// INTERVIEW ROUTEs
router.route('/allInterviews').get(viewController.getAllInterviews);
router.route('/createInterview').get(viewController.createInterview);

module.exports = router;
