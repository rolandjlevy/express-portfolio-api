const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: String, required: true },
  image: { type: String, required: true },
  heading: { type: String, required: true },
  details: { type: String, required: true },
  category: { type: String, required: true }
  // languages: { any: [], required: true },
  // infoButtons: { any: [], required: true }
});

module.exports = mongoose.model("Project", userSchema, "projects");