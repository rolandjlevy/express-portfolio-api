const express = require('express');
const router = express.Router();
const path = require('path');
const Project = require('../models/project');
const { PW, ORIGIN_URI_LIVE } = process.env;

const getProjects = async () => {
  try {
    return await Project.find();
  } catch (err) {
    return {
      "error": err,
      "message": "Error retrieving projects"
    };
  }
}

router.get('/', async (req, res) => {
  const projects = await getProjects();
  res.json(projects);
});

router.get('/sort-order', async (req, res) => {
  const projects = await getProjects();
  projects.sort((a, b) => (a.sortOrder > b.sortOrder) ? 1 : -1);
  const imagesFolder = `${ORIGIN_URI_LIVE}/images/projects/`;
  res.render('pages/sort-order', { projects, imagesFolder });
});

router.post('/sort-order', async (req, res) => {
  let errorMessage = 'Error updating projects';
  const { order, secret } = req.body;
  try {
    if (secret !== PW) {
      errorMessage = 'Incorrect secret so no access available';
      throw new Error();
    }
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
  } catch (err) {
    res.status(400).json({
      "error": err,
      "message": errorMessage
    });
  }
});

router.post('/', async (req, res) => {
  let errorMessage = 'Error creating project';
  const languages = req.body.languages.replace(/ /g, '').split(',');
  const values = { ...req.body, languages, date_added: new Date() };
  try {
    if (values.secret !== PW) {
      errorMessage = 'Incorrect secret so no access available';
      throw new Error();
    }
    const newProject = new Project(values);
    const response = await newProject.save();
    const projects = await getProjects();
    res.render('pages/success');
  } catch (err) {
    res.status(400).json({
      "error": err,
      "message": errorMessage
    })
  }
});

module.exports = router;