const express = require('express');
const bodyParser = require('body-parser');
const crime = require('../models/crime');

const router = express.Router();
const { createCrime, getCrimes,deleteCrime } = require('../controllers/crime');

router.post('/', createCrime);
router.get('/', getCrimes);
router.delete('/',deleteCrime);

module.exports = router;
