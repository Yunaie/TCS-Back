const express = require('express');
const bodyParser = require('body-parser');
const victime = require('../models/victime');

const router = express.Router();
const { createVictim, getVictim,deleteVictim } = require('../controllers/victime');

router.post('/', createVictim);
router.get('/', getVictim);
router.delete('/:id',deleteVictim);

module.exports = router;
