const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Recipe = require('../models/recipeModels.js')

router.use(express.static("public"))

mongoose.connect('mongodb://127.0.0.1:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully!'))
.catch((err) => console.error('MongoDB connection error:', err));

router.get('/', (req, res) => {
  res.render('recipes')  
})

router.get('/:id', async (req, res) =>{
  const recipes = await Recipe.findById(req.params.id)
  res.send(recipes)
})

module.exports = router