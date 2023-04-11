const express = require('express');
const bodyParser = require('body-parser');
const criminel = require('../models/criminel');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allCriminel = await criminel.find();
    res.json(allCriminel);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while getting the criminals.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newCriminel = new criminel(req.body);
    await newCriminel.save();
    res.json(newCriminel);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while creating the criminal.' });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedCriminel = await criminel.findByIdAndRemove({ _id: req.params.id });
    res.send(removedCriminel);
  } catch (error) {
    return res.status(404).send(error);
  }
});

module.exports = router;