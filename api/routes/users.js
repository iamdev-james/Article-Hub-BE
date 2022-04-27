const express = require('express');
const Articles = require('../models/index');

const app = express();

app.use(express.json());

app.get('/articles', (req, res) => {
  Articles.find()
  .select('username title category createdAt _id')
  .then(articles => {
    const resArticles = {
      count: articles.length,
      listedArticles: articles.map( article => {
        return {
          _id: article._id,
          username: article.username,
          title: article.title,
          category: article.category,
          createdAt: article.createdAt,
          request: {
            type: 'GET',
            url: `http://localhost:6000/user/article/${article._id}`
          }
        }
      })
    }
    res.status(200).json(resArticles);
  })
})

app.get('/article/:articleId', (req, res) => {
  const Id = req.params.articleId;
  Articles.findById(Id)
  .select('name username title subTitle category article createdAt')
  .then(article => {
    if (article) {
      res.status(200).json({
        Article: article,
        request: {
          type: "GET",
          url: 'http://localhost:6000/user/articles'
        }
      })
    } else {
      res.status(500).json({
        message: "Invalid Id, Article doesn\'t exist"
      })
    }
  })
  .catch (err => {
    console.log(err.message);
    res.status(500).json({
      message: 'An error occured'
    });
  })
})

app.get('/authors', (req, res) => {
  res.status(200).json({message: 'This is the list of authors'})
})

app.get('/author/:id', (req, res) => {
  res.status(200).json({message: 'This is a particular author'})
})

module.exports = app
