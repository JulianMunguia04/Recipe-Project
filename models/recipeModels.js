// models/User.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  hobbies: [String],
  address: Object,
  createAt: Date,
  updatedAt: Date
});

const recipe = mongoose.model('recipes', recipeSchema);

module.exports = recipe;
