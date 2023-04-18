const express = require('express');
const bodyParser = require('body-parser');
const histoire = require('../models/histoire');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allHistoire = await histoire.find();
    res.json(allHistoire);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while getting the stories.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newHistoire = new histoire(req.body);
    await newHistoire.save();
    res.json(newHistoire);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while creating the story.' });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedHistoire = await histoire.findByIdAndRemove({ _id: req.params.id });
    res.status(201).json({ message: "Story successfully deleted." });
  } catch (error) {
    return res.status(404).send(error);
  }
});

module.exports = router;