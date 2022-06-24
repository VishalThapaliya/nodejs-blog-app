const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.get('/', async (req, res) => {
  const articleContents = await Article.find().sort({ createdAt: 'desc' });
  res.render('articles/index', {
    articles: articleContents,
  });
});

router.get('/articles/new', (req, res) => {
  res.render('articles/new', { article: new Article() });
});

router.get('/articles/edit/:id', async (req, res) => {
  const articleId = await Article.findById(req.params.id);
  res.render('articles/edit', { article: articleId });
});

router.get('/articles/:slug', async (req, res) => {
  const articleId = await Article.findOne({ slug: req.params.slug });
  if (articleId == null) {
    res.redirect('/');
  }
  res.render('articles/show', { article: articleId });
});

router.post(
  '/articles/',
  async (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect('new')
);

router.put(
  '/articles/:id',
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect('edit')
);

router.delete('/articles/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try {
      article = await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (err) {
      res.render(`articles/${path}`, { article: article });
    }
  };
}

module.exports = router;
