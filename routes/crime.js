const express = require('express');
const bodyParser = require('body-parser');
const crime = require('../models/crime');

const router = express.Router();
const { createCrime, getCrimes, deleteCrimes,getCrimeById } = require('../controllers/crime');
const {checkUser, requireAdmin} = require('../middleware/auth');

router.post('/',checkUser,requireAdmin, createCrime);
router.get('/', getCrimes);
router.delete('/:id',checkUser,requireAdmin,deleteCrimes);
router.get('/:id',getCrimeById);

module.exports = router;
