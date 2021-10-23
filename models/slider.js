const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: Number, required: true },
  user_name: { type: String, required: true },
  score: { type: Number, required: true },
},
{ timestamps: true }
);

module.exports = mongoose.model("Slider", userSchema, "sliders");