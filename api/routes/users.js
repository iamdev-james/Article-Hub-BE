const express = require('express');

const app = express();

app.use(express.json());

app.get('/articles', (req, res) => {
  res.status(200).json({message: 'This is the article route'})
})

app.get('/article/:id', (req, res) => {
  res.status(200).json({message: 'This is a particular article'})
})

app.get('/authors', (req, res) => {
  res.status(200).json({message: 'This is the list of authors'})
})

app.get('/author/:id', (req, res) => {
  res.status(200).json({message: 'This is a particular author'})
})

module.exports = app
