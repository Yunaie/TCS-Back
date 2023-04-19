const express = require('express');
const bodyParser = require('body-parser');
const crime = require('../models/article');

const router = express.Router();
const { createArticle, getArticles,deleteArticles } = require('../controllers/article');

router.post('/', createArticle);
router.get('/', getArticles);
router.delete('/:id',deleteArticles);

module.exports = router;
