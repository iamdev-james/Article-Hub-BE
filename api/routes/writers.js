const express = require('express');
const { default: mongoose } = require('mongoose');
const Article = require("../models");

const app = express();

app.use(express.json());

app.post('/:user/articles', (req, res) => {
  const article = new Article({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    username: req.body.username,
    title: req.body.title,
    subTitle: req.body.subTitle,
    category: req.body.category,
    article: req.body.article,
    createdAt: req.body.createdAt
  })
  article.save().then( result => {
    res.status(200).json({ message: 'Received Successfully' })
  }).catch (err => {
    res.status(500).json({ message: err.message })
  })
 })

app.get('/:user/article', () => {
  res.status(200).json({message: 'This is an article by a particular Author'})
})

app.get('/:user/article/:id', () => {
  res.status(200).json({message: 'This is a particular article'})
})

app.put('/:user/article/:id', (req, res) => {
  res.status(200).json({message: 'This is the list of authors'})
})

app.get('/author/:id', (req, res) => {
  res.status(200).json({message: 'This is a particular author'})
})

module.exports = app