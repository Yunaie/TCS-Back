const express = require('express');
const bodyParser = require('body-parser');
const victime = require('../models/victime');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allVictime = await victime.find();
    res.json(allVictime);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while getting the victims.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newVictime = new victime(req.body);
    await newVictime.save();
    res.json(newVictime);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while creating the victim.' });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedVictime = await victime.findByIdAndRemove({ _id: req.params.id });
    res.status(201).json({ message: "Victim successfully deleted." });
  } catch (error) {
    return res.status(404).send(error);
  }
});

module.exports = router;