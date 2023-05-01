const express = require('express');
const bodyParser = require('body-parser');
const article = require('../models/article');

const router = express.Router();
const { createArticle, getArticles,deleteArticle } = require('../controllers/article');

router.post('/', createArticle);
router.get('/', getArticles);
router.delete('/:id',deleteArticle);

module.exports = router;
