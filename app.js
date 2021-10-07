const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://replit.com/");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const projects = require('./api/projects');
app.use('/api/projects', projects);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

module.exports = app;