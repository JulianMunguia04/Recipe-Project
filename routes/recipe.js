const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Recipe = require('../models/recipeModels.js')

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../recipe_images'))
  },
  filename: (req,file,cb)=>{
    console.log(file)
    cb(null, file.originalname)
  }
})

const upload = multer({storage: storage})

router.use(express.static("public"), express.static('recipe_images'))
router.use(express.json())
router.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully!'))
.catch((err) => console.error('MongoDB connection error:', err));

router.get('/favicon.ico', (req, res) => res.status(204));

router.get('/', async (req, res) => {
  const recipes = await Recipe.find()
  res.render("recipe", { recipes: recipes })
})

router.get('/new', async (req, res) =>{
  res.render('new')
})

router.post('/new', upload.single('image') ,(req,res) =>{
  const newRecipe = new Recipe({
    name : req.body.name,
    author: req.body.author,
    createdAt: new Date(),
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    time: req.body.time,
    img: req.file ? req.file.originalname : undefined
  })
  newRecipe.save()
  .then(() => {
    res.redirect('/');
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error adding recipe');
  });
})

router.get('/edit/:id', async (req, res) =>{
    const recipes = await Recipe.findById(req.params.id)
    res.render('edit', {recipes : recipes})
})

router.post('/edit/:id',upload.single('image'), async (req, res) =>{
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, {
      name : req.body.name,
      author: req.body.author,
      createdAt: new Date(),
      description: req.body.description,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      time: req.body.time,
      img: req.file ? req.file.originalname : undefined
    },
    { new: true })
    if (updatedRecipe) {
      res.redirect(`/recipe/${req.params.id}`);
    } else {
      res.status(404).send('Recipe not found');
    }
  }catch(err){
    console.log(err)
  }
  
})

router.get('/delete/:id', async (req, res) =>{
  const recipes = await Recipe.findById(req.params.id)
  res.render('delete', { recipes : recipes })
})

router.delete('/delete/:id', async (req,res)=> {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!deletedRecipe) {
      return res.status(404).send('Recipe not found');
    }

    res.status(200).send('Recipe deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting recipe');
  }
})

router.get('/:id', async (req, res) =>{
  const recipes = await Recipe.findById(req.params.id)
  res.render('view', {recipes: recipes})
})

router.use((req,res) =>{
  res.redirect('/')
})

module.exports = router