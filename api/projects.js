const express = require('express');
const router = express.Router();
const path = require('path');
const Project = require('../models/project');
const { PW, ORIGIN_URI_LIVE } = process.env;

router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const languages = req.body.languages.replace(/ /g, '').split(',');
  const values = { ...req.body, languages, date_added: new Date() };
  if (values.secret !== PW) {
    const err = new Error('Incorrect secret so no access available');
    return next(err);
  }
  try {
    const newProject = new Project(values);
    const response = await newProject.save();
    res.render('pages/success');
  } catch (err) {
    return next(err);
  }
});

router.get('/sort-order', async (req, res, next) => {
  try {
    const projects = await Project.find();
    projects.sort((a, b) => (a.sortOrder > b.sortOrder) ? 1 : -1);
    const imagesFolder = `${ORIGIN_URI_LIVE}/images/projects/`;
    res.render('pages/sort-order', { projects, imagesFolder });
  } catch (err) {
    next(err);
  }
});

router.post('/sort-order', async (req, res, next) => {
  let errorMessage = 'Error updating projects';
  const { order, secret } = req.body;
  if (secret !== PW) {
    const err = new Error('Incorrect secret so no access available');
    return next(err);
  }
  try {
    const sortOrders = JSON.parse(order);
    const writeOperations = sortOrders.map(item => {
      return {
        updateOne: {
          filter: { _id: item.id },
          update: { sortOrder: item.sortOrder, active: item.active }
        }
      };
    });
    const results = await Project.bulkWrite(writeOperations);
    res.render('pages/success');
  } catch (err) {
    next(err);
  }
});

module.exports = router;