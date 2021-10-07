const express = require('express');
const router = express.Router();
const path = require('path');
const Project = require('../models/project');
const { PW } = process.env;

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

router.get('/success', async (req, res) => {
  res.sendFile('/success.html');
});

router.post('/', async (req, res) => {
  const languages = req.body.languages.split(',');
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
    res.sendFile(path.join(__dirname, '../public/success.html'));
  } catch (err) {
    res.status(400).json({
      "error": err,
      "message": "Error creating project"
    })
  }
});

module.exports = router;