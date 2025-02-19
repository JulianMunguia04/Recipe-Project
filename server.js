const express = require("express")
const mongoose = require('mongoose')
const Recipe = require('./models/recipeModels.js')
const app = express()

app.use(express.static("public"), express.static('recipe_images'))
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully!'))
.catch((err) => console.error('MongoDB connection error:', err));


app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  const recipes = await Recipe.find()
  res.render('index', {recipes: recipes})
}) 

const recipeRouter = require('./routes/recipe')

app.use('/recipe', recipeRouter)

app.use((req,res) =>{
  res.redirect('/')
})

app.listen(500)