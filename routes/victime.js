const express = require('express');
const bodyParser = require('body-parser');
const victime = require('../models/victime');

const router = express.Router();
const { createVictim, getVictim,deleteVictim,getVictimeById } = require('../controllers/victime');


router.post('/', createVictim);
router.get('/', getVictim);
router.delete('/:id',deleteVictim);
router.get('/:id',getVictimeById);

module.exports = router;
