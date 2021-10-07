const mongoose = require('mongoose');
const express = require('express');
const app = require('./app.js');
const { PORT = 3000, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
.then(client => {
  console.log("Database Connected Successfully");
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
})
.catch(err => {
  console.error(err.stack);
  process.exit(1);
});