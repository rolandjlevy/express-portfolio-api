const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const { ORIGIN_URI_DEV, ORIGIN_URI_LIVE } = process.env;

const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  let origins = [ORIGIN_URI_DEV, ORIGIN_URI_LIVE];
  if (origins.includes(req.query.origin)) {
    res.header("Access-Control-Allow-Origin", req.query.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  }
  next();
});

const projects = require('./api/projects');
app.use('/api/projects', projects);

app.get('/', (req, res) => {
  res.render('pages/index');
});

module.exports = app;