const express = require('express');
const bodyParser = require('body-parser');
const victime = require('../models/victime');

const router = express.Router();
const { createVictim, getVictim,deleteVictim } = require('../controllers/victime');
const {verifyJWT} = require('../controllers/auth')

router.use(verifyJWT);
router.post('/', createVictim);
router.get('/', getVictim);
router.delete('/:id',deleteVictim);

module.exports = router;
