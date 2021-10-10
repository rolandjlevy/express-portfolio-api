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
  const imagesFolder = `${ORIGIN_URI_LIVE}/images/projects/`;
  res.render('pages/sort-order', { projects, imagesFolder });
});

router.post('/sort-order', async (req, res) => {
  const { order } = req.body;
  const sortOrders = JSON.parse(order);
  try {
    const projects = await getProjects();
    projects.forEach(project => {
      const found = sortOrders.find(item => item.id === project._id.valueOf());
      // console.log(found)
      // project.updateOne({
      //   _id: found.id
      // }, {
      //   $set: {
      //     sortOrder: found.sortOrder
      //   }
      // });
    })
  } catch (err) {
    return {
      "error": err,
      "message": "Error updating projects"
    };
  }
});

router.post('/', async (req, res) => {
  const languages = req.body.languages.replace(/ /g, '').split(',');
  const values = { ...req.body, languages, date_added: new Date() };
  if (values.secret !== PW) {
    res.status(400).json({
      "message": "Error: no access available"
    });
  }
  const newProject = new Project(values);
  try {
    const response = await newProject.save();
    const projects = await getProjects();
    res.render('pages/success');
  } catch (err) {
    res.status(400).json({
      "error": err,
      "message": "Error creating project"
    })
  }
});

module.exports = router;