const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Recipe = require('../models/recipeModels.js')

router.use(express.static("public"), express.static('recipe_images'))

mongoose.connect('mongodb://127.0.0.1:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully!'))
.catch((err) => console.error('MongoDB connection error:', err));

router.get('/', async (req, res) => {
  const recipes = await Recipe.find()
  res.render("recipe", { recipes: recipes })
})

router.get('/edit', async (req, res) =>{
  res.send('Create New Recipe')
})

router.get('/edit/:id', async (req, res) =>{
    const recipes = await Recipe.findById(req.params.id)
    res.send(`Edit:${recipes}`)
})

router.get('/delete/:id', async (req, res) =>{
  const recipes = await Recipe.findById(req.params.id)
  res.send(`Delete:${recipes}`)
})

router.get('/:id', async (req, res) =>{
  const recipes = await Recipe.findById(req.params.id)
  res.send(recipes)
})

module.exports = router