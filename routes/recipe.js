const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('recipes')  
})

router.get('/:id', (req,res) => {
  res.render('recipeid', { id: req.params.id})
})

module.exports = router