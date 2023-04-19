const express = require('express');
const bodyParser = require('body-parser');
const criminel = require('../models/criminel');

const router = express.Router();
const { createCriminel, getCriminals,deleteCriminals } = require('../controllers/criminel');

router.post('/', createCriminel);
router.get('/', getCriminals);
router.delete('/',deleteCriminals);

module.exports = router;
