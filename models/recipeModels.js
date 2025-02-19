// models/User.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
  instructions: String,
  author: String,
  createdAt: Date,
  description: String,
  updatedAt: Date,
  time: String,
  img: String
});

const recipe = mongoose.model('recipes', recipeSchema);

module.exports = recipe;
