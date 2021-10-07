const express = require('express');
const router = express.Router();
const path = require('path');
const Project = require('../models/project');

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
  const { id, image, heading, details, category } = req.body;
  const newProject = new Project({ id, image, heading, details, category });
  try {
    const response = await newProject.save();
    const projects = await getProjects();
    // res.json(projects);
    // res.sendFile('../public/success.html');
    res.sendFile(path.join(__dirname, '../public/success.html'));
  } catch (err) {
    res.status(400).json({
      "error": err,
      "message": "Error creating project"
    })
  }
});

module.exports = router;