const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const { 
  ORIGIN_URI_DEV, 
  ORIGIN_URI_LIVE,
  ORIGIN_URI_SLIDERS,ORIGIN_URI_SLIDERS_TEMP
} = process.env;

const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const routes = require('./api/routes');
app.use('/api/routes', routes);

app.use((req, res, next) => {
  let origins = [ORIGIN_URI_DEV, ORIGIN_URI_LIVE, ORIGIN_URI_SLIDERS];
  if (origins.includes(req.query.origin)) {
    res.header("Access-Control-Allow-Origin", req.query.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  }
  next();
});

app.get('/', (req, res) => {
  res.render('pages/index');
});

/*////////////////*/
/* Error handling */
/*////////////////*/

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// wildcard route throws 302 error (temporary redirect)
app.get('*', (req, res, next) => {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);
  error.statusCode = 302;
  next(error);
});

// middleware for handing errors
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'unknown';
  if (err.statusCode === 302) {
    return res.status(302).redirect('/not-found');
  }
  return res.status(status).render('pages/error', { error:err.toString() })
});

// page not found (404)
app.get('/not-found', (req, res) => {
  const { originalUrl } = req;
  res.status(404).render('pages/not-found', { originalUrl });
});

module.exports = app;