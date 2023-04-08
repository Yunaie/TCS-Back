const express = require('express');
const bodyParser = require('body-parser');
const users = require('../models/users');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allUsers = await users.find();
    res.json(allUsers);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while getting the users.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = new users(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while creating the user.' });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedUser = await users.findByIdAndRemove({ _id: req.params.id });
    res.send(removedUser);
  } catch (error) {
    return res.status(404).send(error);
  }
});

module.exports = router;