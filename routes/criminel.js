const express = require('express');
const bodyParser = require('body-parser');
const criminel = require('../models/criminel');

const router = express.Router();
const { createCriminel, getCriminals,deleteCriminals,getCriminelById } = require('../controllers/criminel');


router.post('/', createCriminel);
router.get('/', getCriminals);
router.delete('/:id',deleteCriminals);
router.get('/:id',getCriminelById);

module.exports = router;
