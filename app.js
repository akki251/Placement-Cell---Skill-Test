const dotenv = require('dotenv');
// dotenv config
dotenv.config({ path: './config.env' });
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./controllers/errorController');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const Student = require('./models/Student');
const router = require('./routes/routes');
const passport = require('passport');
const cors = require('cors');

require('./controllers/passport');

const express = require('express');

const app = express();

//
// ────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: G L O B A L   M I D D L W A R E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────
//
app.use((req, res, next) => {
  res.locals.employee = null;
  res.locals.alert = null;
  next();
});

// cors handling 
app.use(cors());
app.options('*', cors());


app.use(cookieParser());

app.use(express.static('public'));

app.use(expressLayouts);

//  view engine setup 
app.set('layout', './layouts/base');
app.set('view engine', 'ejs');

// cookie and session config 
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
    }),
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());


//  for parsing body data 
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

// for logging request on console
app.use(morgan('dev'));

//  routes 
app.use('/', router);

//  global error handler 
app.use(globalErrorHandler);

module.exports = app;
