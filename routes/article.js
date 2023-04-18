const express = require('express');
const bodyParser = require('body-parser');
const article = require('../models/article');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allArticle = await article.find();
    res.json(allArticle);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while getting the articles.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newArticle = new article(req.body);
    await newArticle.save();
    res.json(newArticle);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while creating the article.' });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedArticle = await article.findByIdAndRemove({ _id: req.params.id });
    res.status(201).json({ message: "Article successfully deleted." });
  } catch (error) {
    return res.status(404).send(error);
  }
});

module.exports = router;