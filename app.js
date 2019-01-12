import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

import indexRouter from './routes/index';
import queryRouter from './controllers/query';
import debugRouter from './controllers/debug';
import models from './models/index';
import { createDummy } from './models';

require('dotenv').config();

const app = express();

// connect();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/sync', function (req, res) {
  models.sequelize.sync({ force:true });
  res.json({
      success: true,
      msg: 'Rebuilt DB Tables, and dummy data',
  });
});

app.get('/', indexRouter);
app.use(debugRouter);
app.use(queryRouter);

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