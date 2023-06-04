const express = require('express');
const bodyParser = require('body-parser');
const article = require('../models/article');

const router = express.Router();
const { createArticle, getLatestArticles,getArticles,deleteArticle,getArticleById } = require('../controllers/article');



router.post('/',createArticle);
router.get('/all', getArticles);
router.get('/',getLatestArticles);
router.get("/:id",getArticleById);
router.delete('/:id',deleteArticle);

module.exports = router;
