const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors'); // Installed To solve BUG

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const projectRouter = require('./routes/projects');
const tasksRouter = require('./routes/tasks');

const db = require('./db');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));

// parse application/json
app.use(bodyParser.json());

const session = require('express-session');
app.use(
  session({ secret: 'my-secret', resave: false, saveUninitialized: true })
);

// Ask mentor (Add to the top of the server)
const dbHelpers = require('./helpers/dbHelpers')(db);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors()); // Installed To solve BUG
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/api/users', usersRouter(dbHelpers));
app.use('/api/projects', projectRouter(dbHelpers));
app.use('/api/tasks', tasksRouter(dbHelpers));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
