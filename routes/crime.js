const express = require('express');
const bodyParser = require('body-parser');
const crime = require('../models/crime');

const router = express.Router();
const { createCrime, getCrimes, deleteCrimes,getCrimeById } = require('../controllers/crime');

router.post('/', createCrime);
router.get('/', getCrimes);
router.delete('/:id',deleteCrimes);
router.get('/:id',getCrimeById);

module.exports = router;
